FROM node:10

WORKDIR /code

COPY package*.json ./
COPY urls.txt ./

RUN npm install

COPY . .

CMD ["npm", "start" ]
