#!/usr/bin/env bash
./gradlew buildDocker
cd docker
docker-compose up > runtime.log &
cd ..