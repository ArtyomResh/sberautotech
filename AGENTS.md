# AGENTS.md

## Repo Shape
- This repo is not a workspace toolchain; it is three separate Yarn projects: root orchestration, `frontend` (Gatsby 2 + React 16 + TypeScript), and `backend` (Strapi v3).
- Frontend content comes from Strapi through `gatsby-source-strapi` in `frontend/gatsby-config.js`. If you change Strapi content types, GraphQL fields, or locale-dependent data, verify both sides.
- Dynamic vacancy pages are created in `frontend/gatsby-node.js`. Secret vacancies route to `/vacancies/special/:strapiId`; other vacancies route to `/vacancies/:strapiId`.
- Strapi content types live under `backend/api/*`. Custom non-CMS endpoints also exist: `POST /form`, `POST /order`, `GET /freeSlots`, and `POST /review`.

## Commands That Matter
- Install everything with `yarn inst` from repo root. It runs `yarn` in root, then `backend`, then `frontend`.
- Full local stack: `yarn develop` from repo root. This starts Postgres via Docker, starts Strapi, then waits for `http://localhost:1337/admin` before starting Gatsby.
- Frontend only: `yarn --cwd frontend develop`.
- Backend only: `yarn --cwd backend develop`.
- Local DB only: `yarn --cwd backend database:start`.

## Verification
- Frontend linting is split: `yarn --cwd frontend lint:es` and `yarn --cwd frontend lint:style`.
- Frontend build: `yarn --cwd frontend build` for Russian, `yarn --cwd frontend buildEn` for English.
- Backend build: `yarn --cwd backend build`.
- Do not run `yarn --cwd frontend test` as a verification step; the script is a placeholder that always exits with failure.
- There are no root lint/test scripts, and `.gitlab/.gitlab-ci.yml` builds/deploys Docker images instead of running lint/tests. Verify changes locally.

## Env And Runtime Gotchas
- README mentions `frontend/.env`, but the checked-in config actually uses `frontend/.env.development` and `frontend/gatsby-config.js` loads `.env.${NODE_ENV}`.
- Frontend content fetching depends on `GATSBY_API_URL`.
- The committed backend DB defaults do not match the committed Docker Compose DB name: `backend/config/database.js` defaults `DATABASE_NAME` to `postgres`, while `backend/data/docker-compose.yml` creates `sberautotech`. For local backend startup, set `DATABASE_NAME=sberautotech` unless your environment already overrides it.
- Backend runtime is effectively Node 14: both Dockerfiles use Node 14 and `backend/package.json` restricts Node to `<=14.x.x`.
- Russian is the default locale everywhere: backend `develop`/`build` set `STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=ru`; frontend `develop`/`build` set `GATSBY_LOCALE_CODE=ru`. Use `developEn` / `buildEn` only when you explicitly need English.

## Frontend/Backend Integration Traps
- Frontend form components submit to relative paths (`/form`, `/order`, `/review`, `/freeSlots`). There is no Gatsby dev proxy config in the repo, so these flows are not wired for plain `localhost:8000` frontend-only dev without adding your own proxy or using the full deployed setup.
- `frontend/src/pages` contains the real Gatsby entry pages. `frontend/src/components/layout` wraps global chrome, SEO, cookie banner, and respond form.
- Backend `api/form/controllers/form.js` sends both email and Huntflow requests; changes there can require `HUNTFLOW_TOKEN`, `HUNTFLOW_ACCOUNT_ID`, and related env vars to exercise safely.

## Formatting Conventions Worth Remembering
- Root and frontend use 4-space indentation (`.editorconfig`, `.stylelintrc`). Backend uses 2-space indentation (`backend/.editorconfig`).
