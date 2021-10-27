'use strict';

function ProductsSeed() {
  const pizzaProductCustomInfo =  [
    {
      group: 'SIZE',
      items: [
        {
          id: 'SMALL - serve 1',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 0,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'MEDIUM - serve 2',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 10000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'LARGE - serve 4',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 20000,
              fraction: 100,
              currency: 'INR'
            }
          }
        }
      ]
    },
    {
      group: 'CRUST',
      items: [
        {
          id: 'Hand tossed',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 1000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Thin crust',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 2000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Cheese burst',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 5000,
              fraction: 100,
              currency: 'INR'
            }
          }
        }
      ]
    },
    {
      group: 'TOPPING',
      items: [
        {
          id: 'Onion',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 1000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Tomato',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 1000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Black Olive',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 2000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Corn',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 1000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Capsicum',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 1000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Paneer',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 5000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Red Chilli',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 1000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Jalapeno',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 1000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Mushroom',
          category: 'VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 3000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Grilled Chicken',
          category: 'NON VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 8000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Chicken Tikka',
          category: 'NON VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 8000,
              fraction: 100,
              currency: 'INR'
            }
          }
        },
        {
          id: 'Barbecue Chicken',
          category: 'NON VEG',
          adjustment: {
            multiplier: 1,
            amount: {
              centAmount: 8000,
              fraction: 100,
              currency: 'INR'
            }
          }
        }
      ]
    }
  ];

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
      updatedAt: Date.now(),
      productCustomInfo: pizzaProductCustomInfo
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
      updatedAt: Date.now(),
      productCustomInfo: pizzaProductCustomInfo
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
      updatedAt: Date.now(),
      productCustomInfo: pizzaProductCustomInfo
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
      updatedAt: Date.now(),
      productCustomInfo: pizzaProductCustomInfo
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
