const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productId1FromDb, productId1FromModel, insertFromDb } = require('../Mocks/products');
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
  it('Testar função de cadastro', async function () {
    sinon.stub(productModel, 'insert').resolves(insertFromDb);
    const inputData = 'Capa da Invisibilidade';
    const responseService = await productsService.insertProduct(inputData);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(insertFromDb);
  });
  afterEach(function () {
    sinon.restore();
  });
});