FROM node:20.11.1

WORKDIR '/app'

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 80
EXPOSE 3000

CMD [ "yarn", "run", "start" ]