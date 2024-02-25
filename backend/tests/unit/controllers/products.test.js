const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { successfulRequest, productId1FromModel, notFoundFulRequest } = require('../Mocks/products');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando produtos na camada controller', function () {
  // it('Testando a função getProducts', async function () {
    
  // });
  it('Testando a função getproductsById com status SUCCESSFUL', async function () {
    sinon.stub(productsService, 'requestProducts').resolves(successfulRequest);
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productId1FromModel);
  });
  it('Testando a função getproductsById com status NOT_FOUND', async function () {
    sinon.stub(productsService, 'requestProducts').resolves(notFoundFulRequest);
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});