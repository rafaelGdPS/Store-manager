const allProductsFromDb = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productId1FromDb = {
  id: 1,
  name: 'Martelo de Thor',
};
const productId1FromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const successfulRequest = {
  status: 'SUCCESSFUL',
  data: productId1FromModel,
};

const notFoundFulRequest = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  allProductsFromDb,
  productId1FromDb,
  productId1FromModel,
  successfulRequest,
  notFoundFulRequest,
};