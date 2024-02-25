const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { allProductsFromDb, productId1FromDb, productId1FromModel } = require('../Mocks/products');
const { productModel } = require('../../../src/models');

describe('Testando products', function () {
  it('Testando função findAll dando certo', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDb]);

    const getAllProducts = await productModel.findAll();
    expect(getAllProducts).to.deep.equal(allProductsFromDb);
  });
  it('testando função findById', async function () {
    sinon.stub(connection, 'execute').resolves([[productId1FromDb]]);

    const getProductsById = await productModel.findById(1);
    expect(getProductsById).to.deep.equal(productId1FromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});