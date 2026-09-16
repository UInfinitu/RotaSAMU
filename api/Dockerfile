# ---- Base ----
FROM node:22-alpine AS base
RUN npm install -g npm@11
WORKDIR /usr/src/app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS deps
RUN npm ci --omit=dev

# ---- Build (caso use TypeScript no futuro) ----
FROM base AS build
RUN npm ci
COPY . .
# RUN npm run build   # descomente se usar TS

# ---- Production ----
FROM node:22-alpine AS production
RUN npm install -g npm@11
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
CMD ["node", "src/server.js"]
