FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

# Add build argument to bust cache for build step
ARG CACHEBUST=1

RUN yarn build

CMD ["yarn", "start"]