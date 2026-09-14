# 372 GeoMedia

Two homepage increments are implemented: shared visual system, navigation, geographic hero, connected-information philosophy, six capability groups, and a team experience section. A minimal footer closes this iteration. The supplied `../logo.png` is preserved and copied into `public/logo.png`.

## Architecture

The original workspace had one logo and no code, framework, package manager, or deployment configuration. The app lives in `site/` to leave that original asset intact.

- React 19, TypeScript, Vinext (Next.js App Router conventions), Vite 8.
- npm and the generated `package-lock.json`.
- `app/layout.tsx`: fonts, metadata, and document shell.
- `app/globals.css`: visual tokens and responsive styling; Tailwind remains available for the supplied UI primitives.
- `app/page.tsx`: composition only. Components are under `components/site/`.
- Static content and map rendering are server components. Only the mobile navigation requires client state; its Sheet primitive supplies keyboard dismissal and focus management.
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
```

The development server prints its local URL (normally http://localhost:3000).

## Visual system

Vermilion `#BD2B29`, charcoal `#151D1C`, ivory `#F7F6F2`, and neutral cartographic tones. Shared width/gutter and typography tokens live in `app/globals.css`. Red identifies information layers and primary actions. Motion registers observation markers and traces real road geometry once; reduced motion and narrow-screen rules disable it.

The map uses real OpenStreetMap geometry for Galveston Bay. Decorative observation markers are explicitly illustrative. It is not a live operational feed. See `lib/geography/README.md` for data provenance, licensing, extent, simplification, and reproduction details. Visible OSM attribution appears beneath the hero. The graphic is SVG; no map SDK or WebGL runtime is loaded.

## Navigation and content

Capabilities and About now link to the homepage's `#capabilities` and `#experience` sections. The hero's What we do link also reaches the capability grid. Work, Contact, and the More about 372 GeoMedia link retain their existing company destinations, centralized in `lib/site-content.ts`. Insights is intentionally omitted until there is a real destination. The Projects page is currently sparse; no case studies, metrics, or clients are invented here.

Confirmed experience wording: **50+ years of combined team experience.** The company owner confirmed that the original site's 50+ years claim refers to the team's combined experience. This wording is displayed in the experience section; the figure does not represent the company's age or years working in GeoAI. Specific project outcomes, team biographies, and credentials still need their own supporting details.

`lib/capabilities.ts` holds the six requested capability groups and concrete applications. Their small decorative SVG motifs illustrate GIS primitives: incident networks, layers, raster analysis, application geometry, integration and feedback, and parcels. All new content is server-rendered and adds no client dependencies. Original service details retained include Blue Roof, debris and temporary power, GIS optimization, site selection and property analysis, public engagement, and ongoing support. Additional technical capabilities come from the user's redesign brief.

## Next increments

Extend the current hierarchy, in order:

1. `ConnectedInformation`: a readable source/analysis/product/action schematic with feedback and lineage; a separate mobile composition.
2. `EmergencyManagementFeature`: a Gulf Coast example with verified imagery and clearly identified scenario data.
3. A collaboration section with approved photography of people actively working.
4. `SelectedWork`: reusable challenge / information / approach / outcome records, with optional extent, sources, method, product, and verified results.
5. `BrandStory`, `ContactCTA`, and an expanded `Footer`.

Assets needed for those increments: approved case-study details and results; project imagery with usage rights; suitable hurricane imagery and forecast source/time; active field/team photography. No additional assets were needed for the first increment. Company contact address and phone on the old site appear to be placeholders and have not been copied.

## Accessibility and validation

Semantic landmarks, a skip link, one H1, visible focus, contrast-conscious text, reduced motion, and a focus-managed mobile menu. Same-page mobile navigation waits for the Sheet to close before transferring focus and scrolling to the destination section. Content and navigation are readable without animation. Responsive layouts change at 1100, 800, and 480px; the capability grid changes from three columns to two, then one, while the experience section stacks. No carousel, auto-playing media, or data-entry form is included.

Build, TypeScript, and lint checks validate authored code. The unmodified generated UI catalog and its unused mobile hook are excluded from lint because the starter ships with lint errors in those files; they remain covered by TypeScript. Browser interaction and device visual QA should be performed before replacing the public production site. The design preview at https://geomedia-372.jasonjordan00.chatgpt.site is accessible to anyone with the link, as requested by the user. It uses a separate domain from 372geomedia.com.
