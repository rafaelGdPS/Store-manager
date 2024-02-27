const dateDb = '2024-02-26T00:52:26.000Z';

const getSalesFromDb = [
  {
    saleId: 1,
    date: dateDb,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateDb,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateDb,
    productId: 3,
    quantity: 15,
  },
];

const getSalesFromModel = [
  {
    saleId: 1,
    date: dateDb,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateDb,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateDb,
    productId: 3,
    quantity: 15,
  },
];

const getSalesByIdFromDb = [
  {
    date: dateDb,
    productId: 1,
    quantity: 5,
  },
  {
    date: dateDb,
    productId: 2,
    quantity: 10,
  },
];

const getSalesByIdFromModel = [
  {
    date: dateDb,
    productId: 1,
    quantity: 5,
  },
  {
    date: dateDb,
    productId: 2,
    quantity: 10,
  },
];

const successfulRequestAllSales = {
  status: 'SUCCESSFUL',
  data: getSalesFromModel,
};

const successfulRequestById = {
  status: 'SUCCESSFUL',
  data: getSalesByIdFromModel,
};

const notFoundFulRequest = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const insertFromDB = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const succesfulInsert = {
  status: 'CREATED',
  data: insertFromDB,
};

module.exports = {
  getSalesFromDb,
  getSalesFromModel,
  getSalesByIdFromDb,
  getSalesByIdFromModel,
  successfulRequestAllSales,
  successfulRequestById,
  notFoundFulRequest,
  insertFromDB,
  succesfulInsert,
};