# Djenitor Backend | Prod Environment
# Install Dependencies and start a node process 
FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add --no-cache --update python3 py3-pip make g++
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
EXPOSE 5000
CMD ["npm", "start"]