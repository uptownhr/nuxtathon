#!/bin/bash

docker-compose run --rm -v $(pwd)/latest:/backup mongo mongorestore /backup/nuxtathondev --db nuxtathondev --drop --host dev_mongo_1
