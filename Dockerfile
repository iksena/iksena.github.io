# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy sources
COPY . .

# Build static site to ./docs (vite configured)
RUN npm run build

# --- Runtime stage ---
FROM nginx:1.25-alpine AS runtime

# Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static files
COPY --from=build /app/docs /usr/share/nginx/html

# Expose port
EXPOSE 80

# Healthcheck (basic)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Run nginx (read-only fs is good, but keep simple)
CMD ["nginx", "-g", "daemon off;"]
