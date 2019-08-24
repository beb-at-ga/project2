FROM node:current-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "index.js" ]


# docker build -t beb/fof .
# docker run --name fof -p 80:3000 -d beb/fof


# Return here to complete the tutorial at step 4, pushing to a repository.
# https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker