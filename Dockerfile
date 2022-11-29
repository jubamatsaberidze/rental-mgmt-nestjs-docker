FROM node:14 AS base
ENV NODE_ENV=production 
ENV DATABASE_USERNAME='postgres'
ENV DATABASE_HOST='database'
ENV DATABASE_NAME='car_rental_db'
ENV DATABASE_PASSWORD='postgres'
ENV DATABASE_PORT=5433

WORKDIR /app

COPY package*.json ./

FROM base AS dev
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base AS prod
RUN npm install --production
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]