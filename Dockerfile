# syntax=docker/dockerfile:1.7

# Multi-stage Dockerfile for a production Next.js app (standalone output)

ARG NODE_VERSION=20-alpine
ARG BUN_VERSION=1.4-alpine

# Bun is the package manager; Node stays the runtime of the standalone server
FROM oven/bun:${BUN_VERSION} AS bun

FROM node:${NODE_VERSION} AS base

WORKDIR /app

# Non-root user for better container security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 -G nodejs

RUN chown -R nodejs:nodejs /app

FROM base AS deps

COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
COPY package.json bun.lock ./

# Install dependencies (includes dev deps needed for building)
RUN --mount=type=cache,target=/root/.bun/install/cache,sharing=locked \
  bun install --frozen-lockfile

FROM base AS builder

COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
COPY package.json bun.lock ./
COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

FROM base AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

WORKDIR /app
USER nodejs

# `next.config.js` sets `output: "standalone"` so the runtime server is at:
# - .next/standalone/server.js
COPY --from=builder --chown=nodejs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nodejs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nodejs:nodejs /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

