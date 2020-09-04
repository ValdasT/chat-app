FROM node:14 AS ui-build
WORKDIR /hugo
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=ui-build /client/build ./client/build
COPY package*.json ./
RUN npm install
COPY api/server.js ./api/

EXPOSE 3080

CMD ["node", "./api/server.js"]