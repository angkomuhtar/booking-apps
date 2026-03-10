FROM node:22-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy semua file
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build NextJS
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]