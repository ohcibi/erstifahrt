FROM ruby:2.5-alpine

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN apk add --no-cache --update build-base sqlite-dev && \
  bundle install

FROM node:9.9-alpine

COPY /assets /app
WORKDIR /app

RUN npm install && \
  npm run-script build-production

FROM ruby:2.5-alpine

COPY . /app
WORKDIR /app

RUN apk add --no-cache --update sqlite-dev && \
  rm -rf /app/assets

COPY --from=0 /usr/local/bundle /usr/local/bundle
COPY --from=1 /app/dist /app/assets/dist

ENV TZ=Europe/Berlin

EXPOSE 9292

CMD ["bundle", "exec", "rackup", "-p9292", "-o0.0.0.0"]
