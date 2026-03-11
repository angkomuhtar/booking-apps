FROM node:22-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Tambahkan ARG & ENV sebelum build
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]