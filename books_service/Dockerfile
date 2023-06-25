FROM node:18.16.0

WORKDIR /app

COPY package.json .

# RUN npm install -g typescript
# RUN npm install -g ts-node

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE 8000

CMD [ "npm", "run" , "dev"]