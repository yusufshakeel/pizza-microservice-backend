# pizza-microservice-backend
This is a microservice project. This repository contains backend code.

# Services
  * [User](#service-user)

## Service: User

This has user details.

To start mongodb in local docker.

```
$ docker container run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongo-on-docker mongo
```