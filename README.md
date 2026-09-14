# 372 GeoMedia

First homepage increment: shared visual system, navigation, hero, and connected-information philosophy. A minimal footer closes this increment. The supplied `../logo.png` is preserved and copied into `public/logo.png`.

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

Until later sections are implemented, Capabilities, Work, About, and Contact lead to their existing company URLs, centralized in `lib/site-content.ts`. Insights is intentionally omitted until there is a real destination. The Projects page is currently sparse; no case studies, metrics, or clients are invented here.

## Next increments

Extend the current hierarchy, in order:

1. `Capabilities`: compact editorial grid for the six requested capability groups.
2. `ConnectedInformation`: a readable source/analysis/product/action schematic with feedback and lineage; a separate mobile composition.
3. `EmergencyManagementFeature`: a Gulf Coast example with verified imagery and clearly identified scenario data.
4. A collaboration section with approved photography of people actively working.
5. `SelectedWork`: reusable challenge / information / approach / outcome records, with optional extent, sources, method, product, and verified results.
6. `BrandStory`, `ContactCTA`, and an expanded `Footer`.

Assets needed for those increments: approved case-study details and results; project imagery with usage rights; suitable hurricane imagery and forecast source/time; active field/team photography. No additional assets were needed for the first increment. Company contact address and phone on the old site appear to be placeholders and have not been copied.

## Accessibility and validation

Semantic landmarks, a skip link, one H1, visible focus, contrast-conscious text, reduced motion, and a focus-managed mobile menu. Content and navigation are readable without animation. Responsive layouts change at 1100, 800, and 480px; the narrative sequence becomes a two-column list on mobile. No carousel, auto-playing media, or data-entry form is included.

Build, TypeScript, and lint checks validate authored code. The unmodified generated UI catalog and its unused mobile hook are excluded from lint because the starter ships with lint errors in those files; they remain covered by TypeScript. Browser interaction and device visual QA should be performed before replacing the public production site. The private design preview does not change 372geomedia.com.
