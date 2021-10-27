# pizza-microservice-backend
This is a microservice project. This repository contains backend code.

# Prerequisite

* Homebrew (for Mac)
* Node +10.0.0
* Docker
* Kubernetes enabled (Docker for Mac/Win)
* [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
* [Skaffold](https://skaffold.dev/)

# Creating secret

```
$ kubectl create secret generic stripe-psp-secret-key --from-literal STRIPE_PSP_SECRET_KEY=<YOUR_SECRET>
$ kubectl create secret generic cart-mongodb-username --from-literal CART_MONGODB_USERNAME=
$ kubectl create secret generic cart-mongodb-password --from-literal CART_MONGODB_PASSWORD=
$ kubectl create secret generic product-mongodb-username --from-literal PRODUCT_MONGODB_USERNAME=
$ kubectl create secret generic product-mongodb-password --from-literal PRODUCT_MONGODB_PASSWORD=
$ kubectl create secret generic user-mongodb-username --from-literal USER_MONGODB_USERNAME=
$ kubectl create secret generic user-mongodb-password --from-literal USER_MONGODB_PASSWORD=
$ kubectl create secret generic payment-mongodb-username --from-literal PAYMENT_MONGODB_USERNAME=
$ kubectl create secret generic payment-mongodb-password --from-literal PAYMENT_MONGODB_PASSWORD=
```

Once the secret is created run the following command it should show the secrets.

```
$ kubectl get secret
NAME                       TYPE                                  DATA   AGE
cart-mongodb-password      Opaque                                1      43h
cart-mongodb-username      Opaque                                1      43h
default-token-68q5b        kubernetes.io/service-account-token   3      159d
payment-mongodb-password   Opaque                                1      2s
payment-mongodb-username   Opaque                                1      11s
product-mongodb-password   Opaque                                1      43h
product-mongodb-username   Opaque                                1      43h
stripe-psp-secret-key      Opaque                                1      43h
user-mongodb-password      Opaque                                1      43h
user-mongodb-username      Opaque                                1      43h
```
# Setup ingress-nginx

Docker Desktop

```
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml --validate=false
```

List the namespace

```
$ kubectl get namespace
NAME              STATUS   AGE
default           Active   162d
ingress-nginx     Active   44s
kube-node-lease   Active   162d
kube-public       Active   162d
kube-system       Active   162d
```

Delete the ingress

```
$ kubectl delete namespace ingress-nginx
```

# Creating docker image

Go to each services directory and run the following command

```
$ npm run docker-build
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
  * [Cart](#service-cart)
  * [Payment](#service-payment)

## Service: User

This has user details.

This is running on port: 10101

## Service: Product

This has product details.

This is running on port: 10102

## Service: Cart

This handles the user cart.

This is running on port: 10103

## Service: Payment

This handles the payment.

This is running on port: 10104

# Payment Service Provider

## Stripe

[stripe.com](https://stripe.com/)

  - [Accept a payment](https://stripe.com/docs/payments/accept-a-payment)
  - [The Payment Intents API](https://stripe.com/docs/payments/payment-intents)

For frontend integration check 
[pizza-microservice-frontend](https://github.com/yusufshakeel/pizza-microservice-frontend) project.