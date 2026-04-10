# ── Etapa 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Etapa 2: Producción con Nginx ────────────────────────────────────────────
FROM nginx:alpine

# SPA compilada
COPY --from=builder /app/dist /usr/share/nginx/html

# Imágenes y assets estáticos (no van al dist porque publicDir se excluye del build)
COPY --from=builder /app/Image /usr/share/nginx/html/Image

# Configuración de Nginx con SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
