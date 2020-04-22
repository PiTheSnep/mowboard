FROM node:alpine as build

WORKDIR /build/

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY shared ./shared
COPY frontend ./frontend

RUN yarn install --pure-lockfile --non-interactive

# Env variables
# To-do: reduce the number of envs in the frontend build as most of them aren't needed.
# ARG TOKEN

# ARG DB_URI
# ARG READ_PERMISSION_LEVEL
# ARG WRITE_PERMISSION_LEVEL

# ARG BACKEND_PORT
# ARG CLIENT_ID
# ARG CLIENT_SECRET
# ARG WS_PORT
# ARG REDIRECT_URI
# ARG SCOPE

ARG NODE_ENV=production

WORKDIR /build/shared
RUN yarn build

WORKDIR /build/frontend
RUN yarn build

# Executable image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/frontend/dist /var/www

RUN ["nginx", "-t"]
