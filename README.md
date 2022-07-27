# Chatapp

This is a chatapp that uses NestJS as a backend, Keycloak as an authentication server, Angular for the web and Flutter for apps. This is a proof of concept to experiment and get accustomed to these frameworks.

# Installation

## Docker

There will be a Dockerfile provided to install all services. This is TODO

## Manual

### Backend

To run, the application requires keycloak and the backend. 

For Keycloak, `Docker-compose` is required. Install this with `sudo apt install docker-compose`. For more information, see the docker-compose documentation https://docs.docker.com/compose/

For NestJS, the nest framework is required. To install, run `npm i -g @nestjs/cli`

To activate Keycloak, run :

```bash
docker-compose up -d
```

To start the backend, run:

```bash
npm run start:dev
```

### Frontend

There are two frontend applications available for this app. The first is an SPA with the Angular framework. To run this, angular must be installed. Then, run
```bash
ng serve
```

The mobile application can be ran on a development device using 
```bash
flutter run
```

