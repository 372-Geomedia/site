# 372 GeoMedia

The local site includes the homepage and all five navigation pages: Capabilities, Work, About, Insights, and Contact. Work and Insights each have three individual detail pages. The supplied `../logo.png` is preserved and copied into `public/logo.png`.

The latest page-completion work is **local only**, as requested. It has not been pushed, packaged or deployed to the shared preview.

## Architecture

The original workspace had one logo and no code, framework, package manager, or deployment configuration. The app lives in `site/` to leave that original asset intact.

- React 19, TypeScript, Vinext (Next.js App Router conventions), Vite 8.
- npm and the generated `package-lock.json`.
- `app/layout.tsx`: fonts, metadata, shared header, main landmark, skip link, and footer. Pages supply their own content without duplicating the shell.
- `app/globals.css`: visual tokens and responsive styling; Tailwind remains available for the supplied UI primitives.
- `app/page.tsx`: composition only. Components are under `components/site/`.
- Static content and map rendering are server components. Desktop active navigation uses `usePathname`; the mobile navigation also uses client state and a Sheet primitive for keyboard dismissal and focus management. The mobile menu resets on route changes.
- `next/image` handles the supplied logo. Sora and IBM Plex Mono use `next/font`.
- Cloudflare-compatible Sites deployment, configured in `.openai/hosting.json` and `vite.config.ts`.

## Development

From this directory:

```sh
npm ci
npm run dev
npm run build
npm run lint
npx tsc --noEmit
npm run check:routes -- http://localhost:3000
```

The development server prints its local URL (normally http://localhost:3000). If that port is occupied, use the exact alternative URL it prints for previewing and route checks.

## Visual system

Vermilion `#BD2B29`, charcoal `#151D1C`, ivory `#F7F6F2`, and neutral cartographic tones. Shared width/gutter and typography tokens live in `app/globals.css`. Red identifies information layers and primary actions. Motion registers observation markers and traces real road geometry once; reduced motion and narrow-screen rules disable it.

The map uses real OpenStreetMap geometry for Galveston Bay. Decorative observation markers are explicitly illustrative. It is not a live operational feed. See `lib/geography/README.md` for data provenance, licensing, extent, simplification, and reproduction details. Visible OSM attribution appears beneath the hero. The graphic is SVG; no map SDK or WebGL runtime is loaded.

## Navigation and content

All company navigation now stays within the local site. The hero's What we do link still reaches the homepage capability section. The header and footer link to the dedicated pages, and the current navigation item remains highlighted on nested detail routes.

| Route | Content |
| --- | --- |
| `/` | Geographic hero, philosophy, capabilities, and team experience |
| `/capabilities` | Six service groups and a connected-information diagram with a feedback loop |
| `/work` | Three clearly labeled illustrative workflows |
| `/work/[slug]` | Challenge, sources, approach, operational outputs, and feedback for each workflow |
| `/about` | Company perspective, combined experience, working principles, and the 372 name story |
| `/insights` | Three original editorial perspectives |
| `/insights/[slug]` | Full article, section navigation, primary-source references, and related reading |
| `/contact` | Published company email and a prefilled email-draft link |

`lib/work.ts` and `lib/insights.ts` hold the detail records. Dynamic pages use async parameters, `generateStaticParams`, `dynamicParams = false`, and `notFound()` for unknown slugs. `app/not-found.tsx` provides a recovery page. Each route has its own title and description; no publication dates or authors are fabricated.

The original site's Projects page did not provide usable project records. Work therefore displays **illustrative workflows**, with explicit labels on both the index and detail pages. These are not claimed client engagements, testimonials, or measured results. Replace them with approved project material when available.

Insights copy is newly drafted for review. Technical references are linked beside the relevant sections: W3C/OGC spatial-data guidance, OGC API Features, W3C PROV, and National Hurricane Center material. The About page links to Mount Vernon's Culper Code Book transcript for the 372 = map origin.

Contact uses the previously published `support@372geomedia.com`. Its draft link opens the visitor's email app with project prompts; the page does not submit messages or claim successful delivery. No contact API, credentials, phone number, or address has been invented.

Confirmed experience wording: **50+ years of combined team experience.** The company owner confirmed that the original site's 50+ years claim refers to the team's combined experience. This wording is displayed in the experience section; the figure does not represent the company's age or years working in GeoAI. Specific project outcomes, team biographies, and credentials still need their own supporting details.

`lib/capabilities.ts` holds the six requested capability groups and concrete applications. Their small decorative SVG motifs illustrate GIS primitives: incident networks, layers, raster analysis, application geometry, integration and feedback, and parcels. All new content is server-rendered and adds no client dependencies. Original service details retained include Blue Roof, debris and temporary power, GIS optimization, site selection and property analysis, public engagement, and ongoing support. Additional technical capabilities come from the user's redesign brief.

## Remaining homepage extensions

Extend the current hierarchy, in order:

1. Integrate the connected-information story further into the homepage; a responsive `InformationCycle` is now available on the Capabilities page.
2. `EmergencyManagementFeature`: a Gulf Coast example with verified imagery and clearly identified scenario data.
3. A collaboration section with approved photography of people actively working.
4. `SelectedWork`: reusable challenge / information / approach / outcome records, with optional extent, sources, method, product, and verified results.
5. `BrandStory`, `ContactCTA`, and an expanded `Footer`.

Assets needed for those increments: approved case-study details and results; project imagery with usage rights; suitable hurricane imagery and forecast source/time; active field/team photography. No additional assets were needed for the first increment. Company contact address and phone on the old site appear to be placeholders and have not been copied.

## Accessibility and validation

Semantic landmarks, a skip link, one H1 per page, visible focus, contrast-conscious text, reduced motion, and a focus-managed mobile menu. The menu closes on ordinary link activation and resets on route changes, including Back/Forward. Content and navigation are readable without animation. Grids stack at narrower breakpoints; diagrams use readable single-column states on small screens. No carousel, auto-playing media, or data-entry form is included.

Build, TypeScript, and lint checks validate authored code. `npm run check:routes` performs local HTTP integration checks across all 12 reachable pages: status, unique metadata, shared landmarks, active navigation, fragment destinations, local links, the email-draft URL, and three genuine 404 responses. It rejects non-local origins. These are not browser interaction or visual tests.

The unmodified generated UI catalog and its unused mobile hook are excluded from lint because the starter ships with lint errors in those files; they remain covered by TypeScript. Browser interaction and device visual QA remain outstanding. The previously shared preview at https://geomedia-372.jasonjordan00.chatgpt.site remains on its earlier published version and is accessible to anyone with the link.
