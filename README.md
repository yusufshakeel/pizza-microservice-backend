# Pizza Microservice Backend

This is a microservice project. This repository contains backend code.

## Table of Content

* [Introduction](#introduction)
* [About the backend](#about-the-backend)
* [Under the hood](#under-the-hood)

### Introduction

This is a simple microservice project and this repository contains backend code.

The frontend code is available in another repository.

[pizza-microservice-frontend](https://github.com/yusufshakeel/pizza-microservice-frontend)

The objective of this project is to create both the frontend and backend for a fictional pizza maker called
***Pizza Pizza***.

### About the backend

Users will visit the website (pizza-microservice-frontend) and they will see products (pizza, sides, etc)
which they can order. Once they add items to the cart and make payment (of course dummy for now) their request will be
sent to the backend modules which is this repository. 

The backend consists of the following domain (or module) that will interact with each other via APIs and events to
process the order.

* Cart
* Delivery
* Kitchen
* Order
* Payment
* [Product](docs/services/product/readme.md)
* User

### Under the hood

Following is being used to build the backend.

* Node
* APIs
  * Fastify
* APIs documentation
  * Swagger
* Testing
  * Jest
