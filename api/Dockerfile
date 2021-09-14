FROM node:15-alpine
WORKDIR /code
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
CMD [ "node", "./build/index.js" ]