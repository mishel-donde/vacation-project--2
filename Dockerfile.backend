FROM node:22-alpine

WORKDIR /app

# Copy shared code first
COPY ./lib ./lib

# Copy backend code
COPY ./backend ./backend

WORKDIR /app/backend

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run build
RUN test -f dist/server.js

# Start the app
CMD ["npm", "start"]
