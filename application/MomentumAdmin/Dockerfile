FROM --platform=linux/amd64 public.ecr.aws/docker/library/node:22.15.1-bookworm AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM public.ecr.aws/nginx/nginx:stable-alpine

COPY --from=build /app/dist/ /usr/share/nginx/html/

COPY ./default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80