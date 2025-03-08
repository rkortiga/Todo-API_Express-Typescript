FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD []