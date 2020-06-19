# Djenitor Front-End | Build Environment
# Install Dependencies and build a prod distribution 
FROM node:13.12.0-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
RUN yarn add react-scripts@3.4.1 -g --silent
COPY . ./
RUN yarn build

# Djenitor Front-End | Prod Environment
# Move the built distribution into a webserver container to serve the content
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]