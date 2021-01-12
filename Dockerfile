FROM node:7
WORKDIR /mysql_nod
COPY package.json ./ 
RUN npm install
COPY . .
CMD node new.js
EXPOSE 9001
