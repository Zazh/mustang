FROM node:20-alpine

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY svelte.config.js vite.config.ts postcss.config.cjs tailwind.config.cjs  tsconfig.json ./
COPY src ./src
COPY static ./static

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]