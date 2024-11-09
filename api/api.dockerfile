FROM node:18.20.4
WORKDIR /api
COPY api/package.json /api
RUN npm install
COPY ./api /api
CMD ["node","./src/app.js"]