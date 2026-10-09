"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Lamp } from "@/components/Lamp";
import { site, mailtoHref, waitlistEndpoint } from "@/content/site";
import { EMAIL_RE, LIMITS, WAITLIST_TRACKS, trackSlugToLabel } from "@/lib/waitlist";

type Status = "idle" | "sending" | "success" | "error";

const COOLDOWN_MS = 30_000;
const COOLDOWN_KEY = "ak-waitlist-last";

const field =
  "mt-2 block w-full border border-line bg-black/40 px-3 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-ink focus:outline-none";

export function WaitlistForm() {
  const params = useSearchParams();
  const [track, setTrack] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const t = trackSlugToLabel[params.get("track") ?? ""];
    if (t) setTrack(t);
  }, [params]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      track,
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
    };

    const fe: Record<string, string> = {};
    if (!payload.name) fe.name = "Please enter your name.";
    if (!EMAIL_RE.test(payload.email)) fe.email = "Please enter a valid email address.";
    if (!payload.track) fe.track = "Please choose a track.";
    setFieldErrors(fe);
    if (Object.keys(fe).length) {
      setStatus("idle");
      setError("");
      return;
    }

    try {
      const last = Number(window.localStorage.getItem(COOLDOWN_KEY) ?? 0);
      const wait = Math.ceil((COOLDOWN_MS - (Date.now() - last)) / 1000);
      if (last && wait > 0) {
        setError(`Please wait ${wait} seconds before sending again.`);
        setStatus("error");
        return;
      }
    } catch {
      // localStorage can be unavailable; skip the cooldown.
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          track: payload.track,
          message: payload.message,
          _subject: `Academy K waitlist: ${payload.track}`,
          _replyto: payload.email,
          _captcha: "false",
          _honey: payload.website,
          _template: "table",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { success?: unknown };
      if (res.ok && (body.success === true || body.success === "true")) {
        try {
          window.localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        setStatus("success");
        return;
      }
      setError("We could not save your request just now. Please try again.");
      setStatus("error");
    } catch {
      setError("We could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-ink p-6 sm:p-8">
        <p className="ak-label flex items-center gap-2 text-ink">
          <Lamp /> Received
        </p>
        <h2 className="ak-serif mt-4 text-3xl leading-tight text-ink sm:text-4xl">You are on the list.</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          We will email you in November with a link to confirm your seat. Nothing to pay now.
        </p>
      </div>
    );
  }

  const err = (k: string) =>
    fieldErrors[k] ? (
      <span id={`err-${k}`} className="mt-1.5 block text-xs text-ink">
        {fieldErrors[k]}
      </span>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line">
      <div className="border-b border-line px-5 py-3 sm:px-6">
        <p className="ak-label">Waitlist</p>
      </div>
      <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8">
        <label className="block">
          <span className="ak-label">01 / Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "err-name" : undefined}
            className={field}
          />
          {err("name")}
        </label>

        <label className="block">
          <span className="ak-label">02 / Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "err-email" : undefined}
            className={field}
          />
          {err("email")}
        </label>

        <label className="block">
          <span className="ak-label">03 / Track of interest</span>
          <select
            name="track"
            required
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            aria-invalid={!!fieldErrors.track}
            aria-describedby={fieldErrors.track ? "err-track" : undefined}
            className={field}
          >
            <option value="">Select a track</option>
            {WAITLIST_TRACKS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("track")}
        </label>

        <label className="block">
          <span className="ak-label">04 / Message (optional)</span>
          <textarea
            name="message"
            rows={4}
            maxLength={LIMITS.message}
            placeholder="Background, goals, anything you want us to know."
            className={`${field} resize-y`}
          />
          {err("message")}
        </label>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {status === "error" ? (
          <p role="alert" className="border border-ink/60 p-4 text-sm leading-relaxed text-ink">
            {error}{" "}
            <a className="underline underline-offset-4" href={mailtoHref()}>
              Email {site.contact}
            </a>
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status === "sending"} className="ak-btn-solid disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Reserve your place"}
          </button>
          <p className="text-sm text-muted">Free to join. Nothing to pay now.</p>
          <p className="text-sm text-muted">
            Or write to{" "}
            <a className="text-ink underline underline-offset-4" href={mailtoHref()}>
              {site.contact}
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
