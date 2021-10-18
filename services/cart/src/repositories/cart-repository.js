'use strict';

const RepositoryError = require('../errors/repository-error');

module.exports = function CartRepository({ CartModel, errorable = RepositoryError() }) {
  this.fetchActiveCartByUserId = errorable(async function fetchActiveCartByUserId(userId) {
    const result = await CartModel.findOne({
      userId,
      cartStatus: 'ACTIVE'
    })
      .sort({ _id: -1 })
      .limit(1);
    if (!result) {
      return {};
    }
    return result;
  });

  this.fetchCartById = errorable(async function fetchCartById(userId, cartId) {
    return CartModel.findOne({ cartId, userId });
  });

  this.upsertCart = errorable(async function upsertCart(userId, cart) {
    return await CartModel.findOneAndUpdate(
      {
        userId,
        cartStatus: 'ACTIVE'
      },
      cart,
      { upsert: true, ['new']: true }
    );
  });
};
