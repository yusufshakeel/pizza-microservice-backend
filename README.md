# pizza-microservice-backend
This is a microservice project. This repository contains backend code.

# Prerequisite

* Homebrew (for Mac)
* Node +10.0.0
* Docker
* Kubernetes enabled (Docker for Mac/Win)
* Skaffold

# Creating secret

```
$ kubectl create secret generic stripe-psp-secret-key --from-literal STRIPE_PSP_SECRET_KEY=<YOUR_SECRET>
$ kubectl create secret generic cart-mongodb-username --from-literal CART_MONGODB_USERNAME=
$ kubectl create secret generic cart-mongodb-password --from-literal CART_MONGODB_PASSWORD=
$ kubectl create secret generic product-mongodb-username --from-literal PRODUCT_MONGODB_USERNAME=
$ kubectl create secret generic product-mongodb-password --from-literal PRODUCT_MONGODB_PASSWORD=
$ kubectl create secret generic user-mongodb-username --from-literal USER_MONGODB_USERNAME=
$ kubectl create secret generic user-mongodb-password --from-literal USER_MONGODB_PASSWORD=
```

Once the secret is created run the following command it should show the secrets.

```
$ kubectl get secret
NAME                       TYPE                                  DATA   AGE
cart-mongodb-password      Opaque                                1      10m
cart-mongodb-username      Opaque                                1      10m
default-token-68q5b        kubernetes.io/service-account-token   3      157d
product-mongodb-password   Opaque                                1      9m21s
product-mongodb-username   Opaque                                1      9m46s
stripe-psp-secret-key      Opaque                                1      12m
user-mongodb-password      Opaque                                1      8m47s
user-mongodb-username      Opaque                                1      9m3s
```

# Start database for local development

Create mongo docker container.

```
$ docker container run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  --name mongo-on-docker \
  mongo
```

# Kubernetes deployment

```
$ skaffold dev
```

# Services
  * [User](#service-user)
  * [Product](#service-product)

## Service: User

This has user details.

## Service: Product

This has product details.
