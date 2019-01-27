FROM node:11.7.0

LABEL version="0.0.1"
LABEL description="GPS Track"
LABEL maintainer="Ronald Cardona - rcardo11@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeApp
COPY . ./

RUN npm install --test

EXPOSE 3000
CMD npm start
