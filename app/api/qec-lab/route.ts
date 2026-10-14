import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 20;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous";
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

const EXPERIMENT_SCHEMA = {
  type: "object",
  properties: {
    action: {
      type: "string",
      enum: ["inject_error", "compare_errors", "build_code", "find_undetectable", "show_stabilisers", "explain_concept"],
    },
    codeId: {
      type: "string",
      enum: ["rep3", "rep5", "rep7", "surf3", "steane"],
    },
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          qubits: { type: "array", items: { type: "integer" } },
          paulis: { type: "array", items: { type: "string", enum: ["X", "Y", "Z"] } },
        },
        required: ["qubits", "paulis"],
      },
    },
    codeSpec: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["repetition", "surface", "steane", "custom"] },
        distance: { type: "integer", minimum: 3, maximum: 9 },
        checks: { type: "array", items: { type: "string" } },
      },
    },
    explanation: { type: "string" },
    generatedCode: { type: "string" },
  },
  required: ["action", "explanation"],
} as const;

const SYSTEM_PROMPT = `You are a QEC (Quantum Error Correction) lab assistant. Your role is to help learners explore error correction through experiments.

IMPORTANT RULES:
1. You BUILD experiments and EXPLAIN concepts. The simulator determines truth.
2. Never judge or grade the learner. Be encouraging and curious.
3. Always produce a structured experiment that can be run in the simulator.
4. Keep explanations concise (2-3 sentences max per point).
5. If the learner asks something outside QEC, gently redirect.

AVAILABLE CODES:
- rep3: 3-qubit repetition code, checks Z01="ZZ_", Z12="_ZZ"
- rep5: 5-qubit repetition code
- rep7: 7-qubit repetition code
- surf3: Distance-3 rotated surface code (9 data qubits, 8 checks: X_a, X_b, X_top, X_bot, Z_a, Z_b, Z_left, Z_right)
- steane: Steane [[7,1,3]] CSS code

ACTIONS:
- inject_error: Place errors on qubits and show which checks light up
- compare_errors: Compare two or more error patterns
- build_code: Generate code for a repetition code of specified distance
- find_undetectable: Search for errors that go undetected (logical errors)
- show_stabilisers: Display stabiliser generators for a code
- explain_concept: Explain a QEC concept with a supporting experiment

For errors, specify qubits (0-indexed) and paulis (X, Y, or Z).

Respond ONLY with valid JSON matching the schema. No markdown, no explanation outside the JSON.`;

async function callLLM(prompt: string): Promise<{ experiment: unknown; error?: string }> {
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL || "gpt-4o-mini";
  const baseUrl = process.env.LLM_BASE_URL || "https://api.openai.com/v1";
  
  if (!apiKey) {
    return { experiment: null, error: "NO_API_KEY" };
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("LLM API error:", text);
      return { experiment: null, error: "API_ERROR" };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return { experiment: null, error: "EMPTY_RESPONSE" };
    }

    const parsed = JSON.parse(content);
    return { experiment: parsed };
  } catch (e) {
    console.error("LLM call failed:", e);
    return { experiment: null, error: "CALL_FAILED" };
  }
}

function validateExperiment(exp: unknown): { valid: boolean; error?: string } {
  if (!exp || typeof exp !== "object") {
    return { valid: false, error: "Invalid experiment object" };
  }
  
  const e = exp as Record<string, unknown>;
  
  if (!e.action || typeof e.action !== "string") {
    return { valid: false, error: "Missing or invalid action" };
  }
  
  const validActions = ["inject_error", "compare_errors", "build_code", "find_undetectable", "show_stabilisers", "explain_concept"];
  if (!validActions.includes(e.action)) {
    return { valid: false, error: `Invalid action: ${e.action}` };
  }
  
  if (!e.explanation || typeof e.explanation !== "string") {
    return { valid: false, error: "Missing explanation" };
  }
  
  if (e.errors && Array.isArray(e.errors)) {
    for (const err of e.errors) {
      if (!err.qubits || !Array.isArray(err.qubits)) {
        return { valid: false, error: "Invalid error: missing qubits" };
      }
      if (!err.paulis || !Array.isArray(err.paulis)) {
        return { valid: false, error: "Invalid error: missing paulis" };
      }
      for (const p of err.paulis) {
        if (!["X", "Y", "Z"].includes(p)) {
          return { valid: false, error: `Invalid Pauli: ${p}` };
        }
      }
    }
  }
  
  return { valid: true };
}

export async function POST(req: NextRequest) {
  const rateLimitKey = getRateLimitKey(req);
  const { allowed, remaining } = checkRateLimit(rateLimitKey);
  
  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait a minute." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  try {
    const body = await req.json();
    const { prompt } = body;
    
    if (!prompt || typeof prompt !== "string" || prompt.length > 500) {
      return NextResponse.json(
        { error: "Invalid prompt" },
        { status: 400 }
      );
    }

    const { experiment, error } = await callLLM(prompt);
    
    if (error === "NO_API_KEY") {
      return NextResponse.json(
        { error: "NO_API_KEY", offline: true },
        { status: 200, headers: { "X-RateLimit-Remaining": String(remaining) } }
      );
    }
    
    if (error) {
      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }
    
    const validation = validateExperiment(experiment);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { experiment },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (e) {
    console.error("Request failed:", e);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
