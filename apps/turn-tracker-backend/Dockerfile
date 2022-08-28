FROM node:16-alpine
EXPOSE 3333
WORKDIR /app
COPY ./dist/apps/turn-tracker-backend .
RUN npm install --production
CMD node ./main.js
