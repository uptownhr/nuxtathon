#!/bin/bash

compose ()

{
echo "$@"
env=$1 && shift
echo "docker-compose -f docker-compose.yml -f docker-compose.$env.yml $@"
docker-compose -f docker-compose.yml -f "docker-compose.$env.yml" $@
}


compose $@