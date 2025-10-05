FROM node:24.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . . 

RUN npm run build 

EXPOSE $PORT

CMD ["npm","run","start:prod"]