# Academy K

Learn the frontier tech that climbs the Kardashev scale.

Academy K is the sibling of [Observatory-K](https://observatoryk.vercel.app), which tracks humanity's climb up the Kardashev scale (the **K** is for Kardashev). Academy K is where you learn the technology that powers the climb. Courses run on the Uncertain Systems platform: you build a proof, and the platform checks it.

The Academy K site is fully static. There is no backend, database or API route, and no payment on this site. Joining the waitlist is free; the form posts straight from the visitor's browser to the FormSubmit email-forwarding service.

## Tracks

Exactly three:

1. **Quantum Computing**
2. **AI / SI** (artificial intelligence and superintelligence)
3. **Thermodynamic Computing**

## Pages

| Route | What |
| --- | --- |
| `/` | Home: hero, tracks, how learning works, Kardashev connection, closing CTA |
| `/tracks` | Catalog and comparison |
| `/tracks/quantum-computing` | Track page |
| `/tracks/ai-si` | Track page |
| `/tracks/thermodynamic-computing` | Track page |
| `/method` | Proof of work, verification, cohorts |
| `/enrol` | How enrolment works: waitlist, November payment link, December cohort |
| `/about` | About, links to Observatory-K and the platform |
| `/faq` | General FAQ |
| `/waitlist` | Waitlist form (`?track=<slug>` preselects a track). Free, no payment |

Each route has its own metadata and a 1200x630 Open Graph image generated at build time.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000 (use `-- --port 3300` for another port)
npm run build    # every page is statically generated
npm run start
```

Requires Node 20+. Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.

## Edit the tracks

All course content is typed data in [`content/`](content):

- `content/tracks.ts`: the three tracks (hook, audience, prerequisites, time, format, modules, outcomes, FAQ).
- `content/types.ts`: the `Track` and `Module` types. Each module has a `week` (1 to 4), a `title`, a one-line `summary` and a `proof` (the proof-of-work deliverable).
- `content/site.ts`: site name, URL, contact address, outbound links, and `offer` (weeks, live sessions, seats, founding and later prices, two- and three-track bundle prices, cohort window). Pages read commercial facts from `offer`.

Edit a module or add one to the `modules` array and every page, the catalog table and the module counts update. The current tracks have eight modules each, two per week. Pages never hard-code course text.

## Enrolment

There is no payment and no Stripe on this site. `/enrol` explains the flow:

1. Join `/waitlist` (free, no commitment). A track slug in the query string preselects the course.
2. Around November, about four weeks before the December start, everyone on the waitlist gets an email with a payment link. That link is not generated here.
3. First cohort: $24.99 per course (founding price), limited to 25 people per course, self-paced over four weeks from December into the first week of January, with a holiday break, plus eight optional live sessions. Later cohorts are $49.99 per course. Seats are confirmed in the order payments come in.

Those figures live in `content/site.ts` as `offer`. Change them there.

## Waitlist form

`/waitlist` posts from the browser (no server code) to the FormSubmit AJAX endpoint set in `content/site.ts` as `waitlistEndpoint`. FormSubmit emails each signup to the Academy K team. The endpoint uses FormSubmit's token form, so the email address is not in the page.

The client:

1. Validates name, email and track, with the limits in `lib/waitlist.ts`.
2. Sends JSON with `Content-Type: application/json` and `Accept: application/json`: `name`, `email`, `track`, `message`, plus `_subject` ("Academy K waitlist: <track>"), `_replyto`, `_captcha: "false"`, `_honey` (the hidden honeypot field, which must be empty) and `_template: "table"`.
3. Counts it as sent only on an HTTP 2xx whose JSON has `success` equal to `true` or `"true"`.
4. Keeps a 30 second cooldown per browser (localStorage), and shows a mailto fallback on errors.

FormSubmit blocks server-side requests behind a Cloudflare challenge, which is why this runs in the browser. To use another endpoint, set `NEXT_PUBLIC_WAITLIST_ENDPOINT` at build time. Test locally by pointing that variable at a small mock server that sends `Access-Control-Allow-Origin: *` and replies `{"success":"true"}`.

## Site URL

`metadataBase` defaults to `https://academy-k.com`. Override it with the `NEXT_PUBLIC_SITE_URL` environment variable at build time (for example a Vercel preview URL). The only other variable is the optional `NEXT_PUBLIC_WAITLIST_ENDPOINT`.

## Deploy on Vercel

1. Import the GitHub repo in Vercel (framework preset: Next.js, no extra settings).
2. Optionally set `NEXT_PUBLIC_SITE_URL` to the production URL.
3. Deploy. The site is fully static; no server configuration is needed.

## Not set yet

- Exact cohort dates inside December and the first week of January. The window is set. The calendar days are not.
- Instructor names.

The `K = 0.73` figure is an estimate as of August 2026. Observatory-K shows the live value.

The privacy note on `/waitlist` is a short note, not a legal policy.

`academy-k.com` is the canonical host. DNS and the Vercel domain are configured separately, outside this repo.

## License

No license has been chosen yet.
