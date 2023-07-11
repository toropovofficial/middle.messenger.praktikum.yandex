FROM node:16.17.0
RUN apt update && apt install -y nodejs && npm install npm -g
WORKDIR ./
COPY package.json package.json
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD npm run build
