FROM node:alpine as build

WORKDIR /build/

COPY package.json .
COPY yarn.lock .

COPY shared ./shared
COPY frontend ./frontend

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /build/shared
RUN yarn build

WORKDIR /build/frontend
RUN yarn build

# Executable image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/frontend/dist /var/www

RUN ["nginx", "-t"]
