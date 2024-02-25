const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productId1FromDb, productId1FromModel } = require('../Mocks/products');
const { productsService } = require('../../../src/services');

describe('testando camada de service', function () {
  it('testando requestProducts pra dar certo', async function () {
    sinon.stub(productModel, 'findById').resolves(productId1FromDb);

    const responseService = await productsService.requestProducts(1);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productId1FromModel);
  });
  it('Testando requestProducts dando erro', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const responseService = await productsService.requestProducts(1);
    
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});