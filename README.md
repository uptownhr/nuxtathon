# Nuxtathon

> Nuxt.js ready to start building your app

## WIP
Goal of this project is to make it easy to develop in nuxt by providing an express interface using serverMiddleware. Gaining inspiration from (hackathon starter)[https://github.com/sahat/hackathon-starter] but wanting to add more by providing a basic admin interface as well.

I have Just started working on this but currently allows you to login with github using a passport extension. Other things to come are 

- [x] hot reloading of express routes as a serverMiddleware in Nuxt
- [x] passport integration (github auth)
- [ ] Buefy
- [ ] PWA
- [ ] Axios Integration
- [ ] User model
- [ ] Registration & Login
- [ ] User Dashboard
- [ ] Admin Dashboard
- [ ] Containerized in Docker

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Build Setup with Docker
Nuxt, Mongo and Proxy container will start

``` bash
# start containers
docker-compose up
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
