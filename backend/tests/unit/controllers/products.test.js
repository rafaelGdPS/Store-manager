const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { successfulRequest, productId1FromModel, notFoundFulRequest, insertFromDb, insertSuccessful } = require('../Mocks/products');
const { productsController } = require('../../../src/controllers');
const validateName = require('../../../src/middlewares/validateName');

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
  it('Testando a funçao de cadastro', async function () {
    sinon.stub(productsService, 'insertProduct').resolves(insertSuccessful);
    
    const req = {
      body: {
        name: 'Capa da Invisibilidade',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateName(req, res, next);
    await productsController.postProduct(req, res);
    expect(next).to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertFromDb);
  });
  it('Testando erro se nome existe', async function () {
    const req = {
      body: {
        
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
  
    await validateName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('Testando erro se nome tem menos de 5 caracteres', async function () {
    const req = {
      body: {
        name: 'cap',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
  
    await validateName(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});