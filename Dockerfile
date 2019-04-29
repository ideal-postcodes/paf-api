# -- Base Imaage --
FROM node:10-alpine AS base

WORKDIR /usr/src/app
copy package.json .

# -- Compilation --
FROM base AS compilation

RUN npm install
COPY . .
RUN npm run build


# -- Release --
FROM base AS release

RUN npm install --only=production --no-package-lock && \
    npm cache clean --force
     
COPY --from=compilation /usr/src/app/dist dist
     
USER node

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

CMD [ "node", "dist/index.js" ]

