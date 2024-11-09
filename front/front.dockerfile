FROM node:18.20.4
RUN npm install -g @angular/cli 
WORKDIR /ngfront
COPY front/package.json /ngfront
RUN npm install
COPY ./front /ngfront
CMD ["ng", "serve", "--host", "0.0.0.0"]