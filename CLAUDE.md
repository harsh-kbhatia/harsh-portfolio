# CLAUDE.md

## Stack
- Vite + React + TypeScript
- Tailwind CSS (utility-only — no separate CSS files, no CSS variables, no App.css-style files)
- react-router-dom for routing
- Deployed to Netlify

## Structure
- Pages live in `src/pages/` — one file per route (Home.tsx, Work.tsx, About.tsx, Contact.tsx)
- Routes are defined in `src/App.tsx`
- Shared/reusable components go in `src/components/` (create this folder when the first shared component is needed — don't pre-scaffold empty folders)

## Conventions
- Styling: Tailwind utility classes only. Do not create new .css files or reintroduce CSS variables.
- Components: functional components only, TypeScript, no class components.
- Keep components small and page-specific unless something is reused across 2+ pages — then move it to `src/components/`.
- Commit messages: Claude may draft a Conventional Commits message, but I review and edit it before committing. Never commit on my behalf without showing me the message first.

## Guardrails — ask me before doing any of these
- Installing new npm packages
- Rewriting an entire existing file when a targeted edit would do
- Changing routing structure or adding new pages not already in the sitemap (Home, Work, About, Contact)
- Touching git config, `.gitignore`, or making commits on my behalf
- Anything related to deployment/Netlify config