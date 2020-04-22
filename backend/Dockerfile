FROM node:alpine as build

WORKDIR /build/

COPY package.json .
COPY yarn.lock .

COPY shared ./shared
COPY backend ./backend

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /build/shared
RUN yarn build

WORKDIR /build/backend
RUN yarn build

# Executable image
FROM node:alpine

WORKDIR /opt/
EXPOSE 8080

# Update OS dependancies
RUN apk update
RUN apk --update add git

COPY package.json .
COPY yarn.lock .

# Copy shared package
COPY --from=build /build/shared/package.json ./shared/package.json
COPY --from=build /build/shared/dist ./shared/dist

# Copy backend
COPY --from=build /build/backend/package.json ./backend/package.json
COPY --from=build /build/backend/dist ./backend/dist

RUN yarn install --pure-lockfile --non-interactive --production

COPY .git ./backend/.git

WORKDIR /opt/backend

ENV NODE_ENV production
ENTRYPOINT [ "yarn", "start" ]
