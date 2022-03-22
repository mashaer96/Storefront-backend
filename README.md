# Storefront Backend Project

This is the repo for [Udacity's Advanced Full-Stack Web Development Nanodegree Program](). It's about building RESTful API with Postgres database. The aim is to provide the frontend co-worker with database and endpoints that is protected and ready to use.

## Table of Contents

* [Instructions](#instructions)
* [Versions](#versions)
* [Creator](#creator)

## Instructions

1- Databse instructions:
- Create the developement and the test databse:
CREATE DATABASE postgres;
CREATE DATABASE postgres_test;

- Create database user:
CREATE USER postgres WITH PASSWORD '12345678';

- Grant all database privileges to user in both databases:
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
GRANT ALL PRIVILEGES ON DATABASE postgres_test TO postgres;

2- Update environment varialbes:
- ENV: the application environment, default dev
- APP_NAME: the application name, default storefront_backend
- PORT: application server base url, default http://localhost:3300
- POSTGRES_HOST: databace host, default 127.0.0.1
- POSTGRES_PORT: database port number, default 5432
- POSTGRES_USER: database user, default postgres
- POSTGRES_PASSWORD: database password, default 12345678
- POSTGRES_DB: production, development database name default, postgres
- POSTGRES_TEST_DB: test database name default, postgres_test

3- you need to start the server from the terminal using (npm run start), then access the localhost on port 3000. Make sure you follow the correct pattern of the URL: http://localhost:3000/users/authenticate where you can replace "/users/authenticate" with any route of the provided endpoints in `REQUIREMENTS.md` file.

4- make sure to start by signing in via http://localhost:3000/users/authenticate since the other endpoints are protected and need token first. you can then visit any endpoint and you can make sure if it needs token or not by viewing `REQUIREMENTS.md` file.

5- You can find a postman `storefront_backend.postman_collection.json` file with all the endpoints which you can imported in postman and view it.

6- Other instrunctions related to terminal:
- To combile the code: "npm run build"
- To run unit tests: "npm run test"
- To start the server: "npm run start"
- To migrate the database up: "npm run db:up"
- To migrate the database down: "npm run db:down"

## Versions

This project uses Node of version 14.18.1, other modules' versions are listed below, this project accepts the exact listed versions or minor releases:

- bcrypt: 5.0.1
- body-parser: 1.19.0
- cors: 2.8.5
- db-migrate: 0.11.13
- db-migrate-pg: 1.2.2
- dotenv: 16.0.0
- express: 4.17.1
- jsonwebtoken: 8.5.1
- pg: 8.5.1
- pgtools: 0.3.2
- @types/bcrypt: 5.0.0
- @types/cors: 2.8.12
- @types/express: 4.17.9
- @types/jasmine: 3.10.3
- @types/jsonwebtoken: 8.5.8
- @types/pg: 7.14.7
- @types/supertest: 2.0.11
- jasmine: 4.0.2
- jasmine-spec-reporter: 7.0.0
- nodemon: 2.0.15
- supertest: 6.2.2
- ts-node: 9.1.1
- tsc-watch: 4.2.9
- typescript: 4.5.5

## Creator

**Masha'er Mostafa**

* [www.linkedin.com/in/mashaer-mostafa](www.linkedin.com/in/mashaer-mostafa)
* [https://github.com/mashaer96](https://github.com/mashaer96)