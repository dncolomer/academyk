# Academy K

Learn the frontier tech that climbs the Kardashev scale.

Academy K is the sibling of [Observatory-K](https://observatoryk.vercel.app), which tracks humanity's climb up the Kardashev scale (the **K** is for Kardashev). Academy K is where you learn the technology that powers the climb. Courses run on the Uncertain Systems platform: you build a proof, and the platform checks it.

The Academy K site is static pages plus one waitlist route. `POST /api/waitlist` forwards signups to a webhook. There is no database on this site, and no payment on this site. Joining the waitlist is free. Around November, people on the list get a separate payment link by email to confirm a seat.

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
| `POST /api/waitlist` | The one serverless route (Node runtime) |

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
- `content/site.ts`: site name, URL, contact address, outbound links, and `offer` (weeks, live sessions, seats, founding and later prices, cohort window). Pages read commercial facts from `offer`.

Edit a module or add one to the `modules` array and every page, the catalog table and the module counts update. The current tracks have eight modules each, two per week. Pages never hard-code course text.

## Enrolment

There is no payment and no Stripe on this site. `/enrol` explains the flow:

1. Join `/waitlist` (free, no commitment). A track slug in the query string preselects the course.
2. Around November, about four weeks before the December start, everyone on the waitlist gets an email with a payment link. That link is not generated here.
3. First cohort: $24.99 per course (founding price), limited to 25 people per course, self-paced over four weeks from December into the first week of January, with a holiday break, plus eight optional live sessions. Later cohorts are $49.99 per course. Seats are confirmed in the order payments come in.

Those figures live in `content/site.ts` as `offer`. Change them there.

## Waitlist route

`app/api/waitlist/route.ts` (Node runtime, POST only) receives the form on `/waitlist`, then:

1. Rate-limits per IP, best effort (5 requests per 10 minutes, in memory, per server instance, resets on cold start).
2. Silently returns 200 for honeypot hits (hidden `website` field) and forwards nothing.
3. Validates and sanitises: name (max 100), email (format, max 254, lower-cased), track (one of Quantum Computing, AI / SI, Thermodynamic Computing, Not sure), optional message (max 1000).
4. Forwards the submission to `WAITLIST_WEBHOOK_URL`. If that URL's host is `formsubmit.co`, it uses the FormSubmit AJAX format (below). For any other host it POSTs generic JSON:

```json
{ "name": "...", "email": "...", "track": "AI / SI", "message": "...", "source": "academy-k.com/waitlist", "submitted_at": "2026-01-01T00:00:00.000Z" }
```

If `WAITLIST_WEBHOOK_KEY` is set it is sent as both `Authorization: Bearer <key>` and `X-Webhook-Key: <key>`. The URL and key are never logged or returned to the client.

**FormSubmit mode.** When the host is `formsubmit.co` (for example `https://formsubmit.co/ajax/<address>`), submissions are sent through the [FormSubmit](https://formsubmit.co) email-forwarding service, which emails each signup to the configured address. The route sends `Accept: application/json`, `Origin: https://academy-k.com`, `Referer: https://academy-k.com/` and a body of `name`, `email`, `track`, `message` plus `_subject` ("Academy K waitlist: <track>"), `_replyto`, `_captcha: "false"`, `_honey: ""` and `_template: "table"`. It counts as success only on an HTTP 2xx whose JSON has `success` equal to `true` or `"true"`. The key is not used in this mode. FormSubmit may require a one-time email activation of the address before it delivers.

On a failed forward the 502 response includes a non-secret `debug` object (`urlValidHttps`, `urlHost`, `keySet`, `upstreamStatus`) and, for FormSubmit, a short `upstreamMessage` if it contains no URL, email address or token.

| Variable | Required | Purpose |
| --- | --- | --- |
| `WAITLIST_WEBHOOK_URL` | for the form to work | Where signups are forwarded. If unset the route returns 503 and the UI shows the `mailto:` fallback. |
| `WAITLIST_WEBHOOK_KEY` | optional | Shared secret sent as the two headers above (generic mode only). |

Set them in Vercel (Project Settings, Environment Variables) or in a local, git-ignored `.env.local`. Responses: 200 ok, 400 invalid, 413 too large, 429 rate limited, 502 webhook failed, 503 not configured.

### Test locally

```bash
# 1. a tiny receiver that prints what it gets
node -e "require('http').createServer((q,r)=>{let b='';q.on('data',c=>b+=c);q.on('end',()=>{console.log(q.headers.authorization,q.headers['x-webhook-key'],b);r.end('ok')})}).listen(9444)" &
# 2. run the site pointing at it
WAITLIST_WEBHOOK_URL=http://127.0.0.1:9444/hook WAITLIST_WEBHOOK_KEY=testkey npm run dev
# 3. submit
curl -X POST localhost:3000/api/waitlist -H 'content-type: application/json' \
  -d '{"name":"Ada","email":"ada@example.com","track":"AI / SI","message":"hi"}'
```

## Site URL

`metadataBase` defaults to `https://academy-k.com`. Override it with the `NEXT_PUBLIC_SITE_URL` environment variable at build time (for example a Vercel preview URL). The only other variables are the two waitlist ones above.

## Deploy on Vercel

1. Import the GitHub repo in Vercel (framework preset: Next.js, no extra settings).
2. Optionally set `NEXT_PUBLIC_SITE_URL` to the production URL.
3. Deploy. The site is static pages plus the single waitlist route; set the two env vars to enable the form.

## Not set yet

- Exact cohort dates inside December and the first week of January. The window is set. The calendar days are not.
- Instructor names.

The `K = 0.73` figure is an estimate as of August 2026. Observatory-K shows the live value.

The privacy note on `/waitlist` is a short note, not a legal policy.

`academy-k.com` is the canonical host. DNS and the Vercel domain are configured separately, outside this repo.

## License

No license has been chosen yet.
