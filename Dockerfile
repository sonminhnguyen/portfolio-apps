FROM node:20.11.1

WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

EXPOSE 80
EXPOSE 3000

CMD [ "npm", "run", "start" ]