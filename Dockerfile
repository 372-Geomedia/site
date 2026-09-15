# syntax=docker/dockerfile:1

# Build stage: Debian (glibc), not Alpine. The build runs the Cloudflare Vite
# plugin, whose workerd binary does not run on musl.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build \
 && rm -rf dist/client/.vite dist/client/.assetsignore dist/client/_headers

# Serve stage: static files only, no Node runtime.
FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/client /usr/share/nginx/html
EXPOSE 80
