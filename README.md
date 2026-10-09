# Academy K

Learn the frontier tech that climbs the Kardashev scale.

Academy K is the sibling of [Observatory-K](https://observatoryk.vercel.app), which tracks humanity's climb up the Kardashev scale (the **K** is for Kardashev). Academy K is where you learn the technology that powers the climb. Behind the scenes, courses run on the Uncertain Systems platform: learn by building proof, verified by the platform instead of by tests.

> **Static prototype.** This is a design and content prototype. There is no backend, database, API route, payment flow or secret. Syllabi are **drafts**; dates, pricing and instructors are **TBA**. The enrol / waitlist call to action is a `mailto:` link.

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
| `/about` | About, links to Observatory-K and the platform |
| `/faq` | General FAQ |

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
- `content/types.ts`: the `Track` and `Module` types. Each module has a `title`, a one-line `summary` and a `proof` (the proof-of-work deliverable).
- `content/site.ts`: site name, URL, contact address, outbound links.

Edit a module or add one to the `modules` array and every page, the catalog table and the module counts update. Keep modules between 6 and 10 per track. Pages never hard-code course text.

## Site URL

`metadataBase` defaults to `https://academy-k.com`. Override it with the `NEXT_PUBLIC_SITE_URL` environment variable at build time (for example a Vercel preview URL). No other environment variables are used.

## Deploy on Vercel

1. Import the GitHub repo in Vercel (framework preset: Next.js, no extra settings).
2. Optionally set `NEXT_PUBLIC_SITE_URL` to the production URL.
3. Deploy. The site is fully static, so no server configuration is needed.

## Placeholders to replace before launch

- Cohort dates, pricing and instructors (currently TBA, no names).
- The `K = 0.73` figure is illustrative. See Observatory-K for live values.
- Waitlist `mailto:` to `daniel@uncertain.systems` can be swapped for a form service.
- `academy-k.com` is the canonical host. DNS and the Vercel domain are configured separately, outside this repo.

## License

No license has been chosen yet.
