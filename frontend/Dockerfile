FROM node:20

WORKDIR /install
COPY package.json /install/
RUN npm i -g react-refresh
RUN npm install
ENV NODE_PATH=/install/node_modules

WORKDIR /app
COPY . .
RUN ln -s /install/node_modules /app/node_modules || true

RUN npm run build
RUN npm install -g serve

EXPOSE 3000