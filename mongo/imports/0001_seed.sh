#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo $DIR

mongoimport --db nuxtathondev --collection users --mode=upsert --file="$DIR/user.mongo"