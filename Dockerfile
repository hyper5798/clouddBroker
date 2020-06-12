FROM node:10.15.3-alpine
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . .
EXPOSE 1883
CMD ["node","server.js"]