FROM node:12

WORKDIR /code

COPY package*.json ./
COPY urls.txt ./

RUN npm install

COPY . .

CMD ["npm", "start" ]
