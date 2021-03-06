FROM node:10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist/finances-front-end /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
