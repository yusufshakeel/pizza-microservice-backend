'use strict';

const { v4: uuidV4 } = require('uuid');
const CartNotFoundError = require('../errors/cart-not-found-error');

module.exports = function Controller({ cartRepository }) {
  this.fetchActiveCartByUserId = async function fetchActiveCartByUserId(userId) {
    const fetchedCart = await cartRepository.fetchActiveCartByUserId(userId);
    return { data: fetchedCart };
  };

  this.fetchCartById = async function fetchCartById(userId, cartId) {
    const fetchedCart = await cartRepository.fetchCartById(userId, cartId);
    if (!fetchedCart) {
      throw new CartNotFoundError({ userId, cartId });
    }
    return { data: fetchedCart };
  };

  this.upsertCart = async function upsertCart(userId, cart) {
    const matchingCart = await cartRepository.fetchActiveCartByUserId(userId);
    const fetchedCart = await cartRepository.upsertCart(userId, {
      ...cart,
      userId,
      cartId: matchingCart?.cartId ? matchingCart.cartId : uuidV4(),
      updatedAt: Date.now()
    });
    return { data: fetchedCart };
  };
};
