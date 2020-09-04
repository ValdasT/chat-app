FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:14 AS server-build
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY server/ .
RUN  npm install

EXPOSE 5000

CMD ["npm","run", "start"]