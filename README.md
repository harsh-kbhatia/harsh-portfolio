# Harsh Portfolio

Personal portfolio site, built with Vite, React, TypeScript, and Tailwind CSS. Deployed to Netlify.

## Pages

- **Home** — `src/pages/Home.tsx`
- **Work** — `src/pages/Work.tsx`
- **About** — `src/pages/About.tsx`
- **Contact** — `src/pages/Contact.tsx`

Routes are defined in `src/App.tsx`.

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Structure

```
src/
  pages/       one file per route
  components/  shared components (created when needed)
  App.tsx      route definitions
  main.tsx     entry point
```

## Conventions

See [CLAUDE.md](./CLAUDE.md) for stack details and coding conventions.

## License

MIT — see [LICENSE](./LICENSE).
