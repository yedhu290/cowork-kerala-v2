# syntax=docker/dockerfile:1

FROM oven/bun:1-alpine AS base
WORKDIR /app

# --- deps ---
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# --- build ---
FROM base AS build
# Bun's bundler inlines process.env.NODE_ENV at build time, so this has to be
# set here and not only in the runner stage. Without it the bundle hard-codes
# "development", config.nodeEnv is wrong at runtime no matter what the
# container environment says, and the error middleware returns internal error
# messages to clients in production.
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun build src/index.ts --outdir ./dist --target bun

# --- runtime ---
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S expressjs -G nodejs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

USER expressjs

EXPOSE 8091

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8091/health || exit 1

CMD ["bun", "run", "dist/index.js"]
