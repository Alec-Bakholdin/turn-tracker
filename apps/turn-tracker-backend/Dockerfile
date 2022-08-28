FROM node:16-alpine
EXPOSE 3333
WORKDIR /app
COPY . .
RUN npm install --production
CMD node ./main.js
