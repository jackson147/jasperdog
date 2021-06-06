FROM node:12

WORKDIR /code

COPY package*.json ./
COPY urls.txt ./
COPY add_to_slack.html ./

RUN npm install

COPY . .

CMD ["npm", "start" ]
