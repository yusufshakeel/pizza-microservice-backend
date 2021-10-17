'use strict';

function ProductsSeed() {
  return [
    {
      productId: 'p-1',
      productName: 'Paneer Pizza',
      productDescription: 'Delicious tandoori paneer',
      productGroup: 'VEG',
      productCategory: 'PIZZA',
      price: {
        centAmount: 20000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-2',
      productName: 'Veg Delight Pizza',
      productDescription: 'Onion, capsicum, tomato, mushroom',
      productGroup: 'VEG',
      productCategory: 'PIZZA',
      price: {
        centAmount: 20000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-3',
      productName: 'Chicken Delight Pizza',
      productDescription: 'Tandoori chicken',
      productGroup: 'NON VEG',
      productCategory: 'PIZZA',
      price: {
        centAmount: 30000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-4',
      productName: 'Chicken Tikka Pizza',
      productDescription: 'Chicken juicy tikka',
      productGroup: 'NON VEG',
      productCategory: 'PIZZA',
      price: {
        centAmount: 30000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-5',
      productName: 'Cheese Dip',
      productDescription: 'An all-time favorite',
      productGroup: 'VEG',
      productCategory: 'SIDES',
      price: {
        centAmount: 2000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-6',
      productName: 'Garlic Breadstick',
      productDescription: 'An all-time favorite',
      productGroup: 'VEG',
      productCategory: 'SIDES',
      price: {
        centAmount: 5000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-7',
      productName: 'Stuffed Garlic Breadstick',
      productDescription: 'An all-time favorite',
      productGroup: 'VEG',
      productCategory: 'SIDES',
      price: {
        centAmount: 7500,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-8',
      productName: 'Pepsi (500ml)',
      productDescription: 'Soft drink',
      productGroup: 'VEG',
      productCategory: 'BEVERAGES',
      price: {
        centAmount: 6000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-9',
      productName: '7Up (500ml)',
      productDescription: 'Soft drink',
      productGroup: 'VEG',
      productCategory: 'BEVERAGES',
      price: {
        centAmount: 6000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-10',
      productName: 'Chocolate Lava Cake',
      productDescription: 'Delicious',
      productGroup: 'VEG',
      productCategory: 'DESSERTS',
      price: {
        centAmount: 5000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    },
    {
      productId: 'p-11',
      productName: 'Red Velvet Cake',
      productDescription: 'Delicious',
      productGroup: 'VEG',
      productCategory: 'DESSERTS',
      price: {
        centAmount: 5000,
        fraction: 100,
        currency: 'INR'
      },
      updatedAt: Date.now()
    }
  ]
}

module.exports = ProductsSeed;
