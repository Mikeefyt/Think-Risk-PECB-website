# Think Risk International – PECB training website

Next.js (App Router, TypeScript) version of the Think Risk PECB training site.
Live address (planned): https://pecb.thinkrisk.com.au

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000, reloads as you edit
```

To check a production build: `npm run build`, then `npm start`. `npm run typecheck` checks the TypeScript.

## Where things live

| What | Where |
|---|---|
| Course data, prices (AUD/MYR/USD), currencies, levels, learning-plan items | `lib/courses.ts` |
| Pages | `app/**/page.tsx` (e.g. `app/about/page.tsx`) |
| The 9 course pages (one template) | `app/courses/[slug]/page.tsx` → `/courses/27001-lead-auditor` etc. |
| Header, footer, learning plan, course finder, enquiry form | `components/` |
| Colours, fonts, layout | `app/globals.css` (colour variables at the top) |
| Images, videos, icons | `public/assets/` |
| Page titles, descriptions, share tags | `metadata` at the top of each page; shared helper in `lib/seo.ts` |
| Sitemap and robots.txt | `app/sitemap.ts`, `app/robots.ts` |
| Enquiry email sending | `app/api/enquiry/route.ts`, email text in `lib/enquiry.ts` |

Changing a price in `lib/courses.ts` updates every page, the learning plan, the course finder and the
Course structured data for Google. Old `.html` addresses (e.g. `/about.html`) redirect to the new ones
(`next.config.ts`).

## Enquiry emails

The contact form sends enquiries straight to pecb@thinkrisk.com.au through [Resend](https://resend.com),
with the visitor's address as Reply-To. They are sent from the domain `pecbthinkrisk.com.au`
(verified in Resend; its DKIM and `send`/`rsend` records are in Hostinger DNS), so the company
email on thinkrisk.com.au (Microsoft 365) is not affected. Settings are environment variables
(see `.env.example`):

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | `re_...` (Sending access, never commit it) |
| `ENQUIRY_FROM` | `enquiries@pecbthinkrisk.com.au` |
| `ENQUIRY_TO` | `pecb@thinkrisk.com.au` (default) |

Locally, copy `.env.example` to `.env.local` and fill it in. If sending isn't set up or fails, the form
keeps what the visitor typed and shows an error asking them to try again or email pecb@thinkrisk.com.au;
the reason is logged on the server. Spam protection: a hidden honeypot field and a limit of 5 enquiries
per visitor every 10 minutes.

## Deploying to Hostinger (Node.js)

This site runs as a Node.js app, so it needs a Hostinger plan that supports Node.js web apps
(check your plan in hPanel; a VPS also works).

1. In hPanel, create a **Node.js web app** for `pecb.thinkrisk.com.au`, connected to this GitHub repo
   (or upload the files without `node_modules` and `.next`).
2. Node version: 20 or 22.
3. Build command: `npm install && npm run build`. Start command: `npm start`
   (`next start` uses the `PORT` that Hostinger provides).
4. Add the enquiry email environment variables above in the app's settings.
5. Turn on SSL for the domain.
6. After going live: submit `https://pecb.thinkrisk.com.au/sitemap.xml` in Google Search Console, test a
   course page in Google's Rich Results Test and a page in LinkedIn Post Inspector, and send yourself a
   test enquiry.

## Still to confirm

- USD prices (Foundation USD $280, Lead Implementer/Auditor USD $695, additional PECB course USD $420)
  were converted from AUD at 0.70 on 6 November 2026 and rounded. Confirm them, or replace them in
  `lib/courses.ts`. They don't follow exchange-rate changes automatically.
- New wording for direct sending, which should be checked: contact page steps ("Complete. Submit. Hear
  from Think Risk."), the form note, the "Enquiry sent" message, the FAQ "What happens when I select
  Submit Enquiry?" and the "Enquiry privacy" notice.
- Online payment is not built; "Request enrolment" sends the learning plan as an enquiry.
- See `Think-Risk-Website-Redesign/START-HERE.txt` for content notes carried over from the static version
  (photo and video credits, testimonials, ABN/phone/address not yet on the site).

The original static HTML version is kept in `Think-Risk-Website-Redesign/` for reference.
