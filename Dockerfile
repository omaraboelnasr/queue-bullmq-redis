FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 6060
CMD ["npm","run","start:dev"]