const dummy = {
  storeName: 'Target',
  storeLocation: {
    country: 'USA',
    state: 'NY',
  },
  datePurchaed: '10:05PM APRIL 10, 2020',
  dateUploaded: '10:05PM APRIL 11, 2020',
  imageURL: 'https://firebase...',
  isTextParsed: true,
  groceryItems: {
    jeneshFarmsWholeMilk2PercentOrganic: {
      price: 5.0,
      upc: 123098456874,
      quantity: {
        unit: 'gallon',
        amount: 1,
        count: 2,
      },
    },
    jeneshFarmsCreamCheese: {
      price: 6.0,
      upc: 123685673234,
      quantity: {
        unit: 'pint',
        amount: 1,
        count: 3,
      },
    },
    jeneshFarmsFrostedCereal: {
      price: 4.4,
      upc: 767546853476,
      quantity: {
        unit: 'box',
        amount: 1,
        count: 1,
      },
    },
    jeneshFarmsWholeGrainRice: {
      price: 11.0,
      upc: 123095687634,
      quantity: {
        unit: 'large bag',
        amount: 1,
        count: 1,
      },
    },
  },
};

module.exports = {
  dummy,
};
