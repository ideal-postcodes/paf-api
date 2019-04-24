FROM node:10-alpine

WORKDIR /usr/src/app

ARG PORT=8000
ENV PORT $PORT
EXPOSE $PORT

COPY package.json .

RUN npm install --no-package-lock && \
    npm cache clean --force

COPY . .
     
RUN npm run build && \
    npm prune --production

USER node

CMD [ "node", "dist/index.js" ]

