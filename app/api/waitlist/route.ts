import { EMAIL_RE, LIMITS, WAITLIST_TRACKS } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 8 * 1024;

// Best-effort only: in-memory, per server instance, resets on cold start.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const stripped = value.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim().slice(0, max);
}

function json(body: Record<string, unknown>, status: number, headers?: Record<string, string>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, 429, {
      "Retry-After": "600",
    });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);

  let data: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    data = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill hidden fields. Pretend success, forward nothing.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const name = clean(data.name, LIMITS.name);
  const email = clean(data.email, LIMITS.email).toLowerCase();
  const message = clean(data.message, LIMITS.message, true);
  const trackRaw = clean(data.track, 50);
  const track = (WAITLIST_TRACKS as readonly string[]).includes(trackRaw) ? trackRaw : "";

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Please enter your name.";
  if (!email || !EMAIL_RE.test(email)) fields.email = "Please enter a valid email address.";
  if (!track) fields.track = "Please choose a track.";
  if (typeof data.name === "string" && data.name.trim().length > LIMITS.name) fields.name = `Name must be ${LIMITS.name} characters or fewer.`;
  if (typeof data.message === "string" && data.message.trim().length > LIMITS.message) fields.message = `Message must be ${LIMITS.message} characters or fewer.`;
  if (Object.keys(fields).length) {
    return json({ ok: false, error: "Please check the highlighted fields.", fields }, 400);
  }

  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) {
    return json(
      { ok: false, error: "The waitlist form is not available right now. Please email daniel@uncertain.systems instead." },
      503,
    );
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const key = process.env.WAITLIST_WEBHOOK_KEY;
  if (key) {
    headers.Authorization = `Bearer ${key}`;
    headers["X-Webhook-Key"] = key;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name,
        email,
        track,
        message,
        source: "academy-k.com/waitlist",
        submitted_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
  } catch (err) {
    // Log only a generic reason; never the URL, key or submitted data.
    console.error("waitlist forward failed:", err instanceof Error ? err.message.replace(/https?:\/\/\S+/g, "[url]") : "unknown");
    return json(
      { ok: false, error: "We could not save your request just now. Please try again, or email daniel@uncertain.systems." },
      502,
    );
  }

  return json({ ok: true }, 200);
}

export function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
}
