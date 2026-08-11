# CoWork Kerala — Monorepo

Combines the three former repos (`cowork-kerala-web`, `cowork-kerala-admin`,
`cowork-kerala-server`) into one self-contained monorepo:

```
cowork/
├── apps/
│   ├── web/      Next.js 16 (App Router) - public marketing site + /admin dashboard
│   └── server/   Node.js/Express + Bun - REST API (MongoDB)
├── package.json  root convenience scripts
└── README.md
```

This folder is fully self-contained (all source was copied in, nothing
references the old `cowork-kerala-*` folders) — they can be deleted once
you've confirmed everything here works.

## Why one Next.js app instead of two

The old admin dashboard and public site were two separate Next.js projects.
They're now one app:

- Public marketing pages live at the app root (`/`, `/about`, `/contact`,
  `/coworking-space`, `/virtual-office`, `/private-office`, ...).
- The admin dashboard lives entirely under `/admin/**` (`/admin`,
  `/admin/leads`, `/admin/spaces`, `/admin/locations`, `/admin/settings`,
  `/admin/login`), protected by NextAuth middleware scoped to that path only
  (`apps/web/src/proxy.ts`, Next 16's replacement for `middleware.ts`).
- `/admin/**` is marked `robots: { index: false, follow: false }`
  (`apps/web/src/app/admin/layout.tsx`) and `robots.ts` also disallows
  `/admin/` for crawlers — the dashboard never leaks into search results.
- Public pages keep their own SEO surface: `src/app/robots.ts`,
  `src/app/sitemap.ts` (dynamic, pulls live workspace/location data from the
  API), and per-page `metadata` exports.
- Shared `components/ui/*` (shadcn primitives) are used by both areas.
  Admin-only code lives under `components/admin/`, `lib/admin/`.

A duplicate, unreferenced `/landing` route from the old web repo (dead code —
the real homepage was the `(landing)` route group) was dropped during the
merge.

## Ports & environment

| App              | Dev port | Env file               |
|-------------------|----------|-------------------------|
| `apps/web`         | 3000     | `apps/web/.env.example` |
| `apps/server`       | 8091     | `apps/server/.env.example` |

Copy each `.env.example` to `.env` (or `.env.local` for the web app) and fill
in real values (MongoDB URI, JWT secret, R2 credentials, `AUTH_SECRET`, etc.)
before running.

`apps/web` talks to the API via `NEXT_PUBLIC_API_URL`
(`http://localhost:8091/api/v1` by default) — this is used by every service
file, the admin `axios` client, and NextAuth's `authorize()` callback.
It also needs `NEXT_PUBLIC_CLOUDFLARE_R2_WORKER_URL` /
`NEXT_PUBLIC_CLOUDFLARE_R2_URL` for the admin file-upload flow.

If you deploy `apps/server` behind a reverse proxy on a different port,
`CORS_ORIGIN` in its `.env` must list every origin `apps/web` is served
from (comma-separated) - since the admin dashboard now lives at
`<site>/admin` rather than its own subdomain, it no longer needs a separate
`admin.*` origin.

## Running locally

```bash
# one-time installs (web uses pnpm, server uses bun — kept separate on
# purpose, see "Package managers" below)
pnpm run install:all

# both apps together
pnpm run dev

# or individually
pnpm run dev:web       # http://localhost:3000  (site) and /admin (dashboard)
pnpm run dev:server    # http://localhost:8091  (API + /api-docs Swagger UI)
```

Seed an initial admin user (required to log into `/admin`):

```bash
cd apps/server
bun run seed
```

## Package managers

- **`apps/web`** (and the repo tooling in general) uses **pnpm**. It has its
  own `pnpm-workspace.yaml` (just for `onlyBuiltDependencies` — approves the
  native build scripts for `sharp`/`unrs-resolver`) and `packageManager`
  field pinning the version for corepack.
- **`apps/server`** uses **Bun** — it's already written against Bun's
  runtime/tooling.

They're intentionally **not** wired into a single pnpm workspace, since
mixing a Bun-only app into a pnpm workspace tends to cause hoisting/lockfile
issues. Each app installs and locks its own dependencies independently
(`apps/web/pnpm-lock.yaml`, `apps/server/bun.lock`); the root `package.json`
just provides convenience scripts that `cd` into each app.

## Git

This folder is not git-initialized — that's intentionally left for you to
set up.
