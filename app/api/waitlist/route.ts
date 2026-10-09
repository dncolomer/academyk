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

  const key = process.env.WAITLIST_WEBHOOK_KEY;

  // Non-secret diagnostics only: never the path, query, key or response body.
  let parsed: URL | null = null;
  try {
    parsed = new URL(url.trim());
  } catch {
    parsed = null;
  }
  const debug: Record<string, unknown> = {
    urlValidHttps: parsed?.protocol === "https:",
    urlHost: parsed?.hostname ?? null,
    keySet: Boolean(key),
  };
  const fail = (upstreamStatus: number | string, upstreamMessage?: string) =>
    json(
      {
        ok: false,
        error: "We could not save your request just now. Please try again, or email daniel@uncertain.systems.",
        debug: { ...debug, upstreamStatus },
        ...(upstreamMessage ? { upstreamMessage } : {}),
      },
      502,
    );

  if (!parsed) {
    console.error("waitlist forward failed: invalid_url");
    return fail("invalid_url");
  }

  const isFormSubmit = parsed.hostname === "formsubmit.co" || parsed.hostname === "www.formsubmit.co";
  let headers: Record<string, string>;
  let payload: Record<string, string>;

  if (isFormSubmit) {
    // FormSubmit AJAX format: unknown keys become fields in the emailed table.
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.9",
      Origin: "https://academy-k.com",
      Referer: "https://academy-k.com/",
      // FormSubmit sits behind bot filtering that can reject default server-side user agents.
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    };
    payload = {
      name,
      email,
      track,
      message,
      _subject: `Academy K waitlist: ${track}`,
      _replyto: email,
      _captcha: "false",
      _honey: "",
      _template: "table",
    };
  } else {
    headers = { "Content-Type": "application/json" };
    if (key) {
      headers.Authorization = `Bearer ${key}`;
      headers["X-Webhook-Key"] = key;
    }
    payload = {
      name,
      email,
      track,
      message,
      source: "academy-k.com/waitlist",
      submitted_at: new Date().toISOString(),
    };
  }

  try {
    const res = await fetch(parsed.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
      redirect: "manual",
    });

    if (isFormSubmit) {
      let body: { success?: unknown; message?: unknown } = {};
      try {
        const text = await res.text();
        try {
          body = JSON.parse(text);
        } catch {
          // Non-JSON (for example an HTML block page): surface only a short, safe title if there is one.
          const title = /<title>([^<]{1,120})<\/title>/i.exec(text)?.[1];
          body = { message: title };
        }
      } catch {
        body = {};
      }
      const ok = res.ok && (body.success === true || body.success === "true");
      if (!ok) {
        console.error(`waitlist forward failed: formsubmit ${res.status}`);
        return fail(res.status, safeMessage(body.message));
      }
    } else if (!res.ok) {
      console.error(`waitlist forward failed: upstream ${res.status}`);
      return fail(res.status);
    }
  } catch (err) {
    const timeout = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    console.error(`waitlist forward failed: ${timeout ? "timeout" : "network"}`);
    return fail(timeout ? "timeout" : "network");
  }

  return json({ ok: true }, 200);
}

/** A short upstream message, only if it carries no URL, email address or token-like string. */
function safeMessage(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.replace(/\s+/g, " ").trim();
  if (!text || /https?:|:\/\/|www\.|@|[A-Za-z0-9_-]{24,}/.test(text)) return undefined;
  return text.slice(0, 160);
}

export function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST" });
}
