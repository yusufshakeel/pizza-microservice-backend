# pizza-microservice-backend
This is a microservice project. This repository contains backend code.

# Start database

```
$ docker container run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongo-on-docker mongo
```

# Services
  * [User](#service-user)
  * [Product](#service-product)

## Service: User

This has user details.

## Service: Product

This has product details.
