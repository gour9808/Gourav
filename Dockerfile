FROM node
COPY ./package-deploy.json /package.json
COPY ./index.js /index.js
RUN npm install pm2 -g
COPY ./dist /dist
RUN npm install --only=production
ENV SERVER_PORT 8080
EXPOSE 8080
CMD pm2-docker index.js