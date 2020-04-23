FROM node:alpine as build

WORKDIR /build/

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY shared ./shared
COPY frontend ./frontend

RUN yarn install --pure-lockfile --non-interactive

# Env variables
ENV REDIRECT_URI=
ENV NODE_ENV=production

WORKDIR /build/shared
RUN yarn build

WORKDIR /build/frontend
RUN yarn build

# Executable image
FROM nginx:alpine

WORKDIR /etc/nginx

COPY frontend/nginx.conf .
COPY --from=build /build/frontend/dist /etc/nginx/html

RUN ["nginx", "-t"]
