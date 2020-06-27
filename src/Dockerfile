FROM node:12

RUN ["npm", "i", "-g", "serve"]

WORKDIR /usr/src/app
COPY src/package.json ./
RUN ["npm", "install"]
COPY src/. .
RUN ["npm", "run", "build"]

EXPOSE 5000

CMD ["serve", "-s", "build"]