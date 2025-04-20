# Dockerfile.frontend

FROM node:22-alpine as builder

WORKDIR /app

# Copy package files
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy shared lib and frontend source
COPY ./lib ./lib
COPY ./frontend ./frontend

# Build the frontend
WORKDIR /app/frontend
RUN npm run build

# Final nginx stage
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
