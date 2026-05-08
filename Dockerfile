

FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production


FROM node:20-alpine AS production

WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup


COPY --from=builder /app/node_modules ./node_modules

COPY package.json ./
COPY src ./src


USER appuser


EXPOSE 3000


CMD ["node", "src/index.js"]
