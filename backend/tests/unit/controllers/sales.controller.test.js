const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { successfulRequestAllSales, getSalesFromModel, successfulRequestById, getSalesByIdFromModel, notFoundFulRequest, succesfulInsert, insertFromDB } = require('../Mocks/sales');
const { salesController } = require('../../../src/controllers');
const validateProductId = require('../../../src/middlewares/validateProductId,');
const validateQuantity = require('../../../src/middlewares/validateQuantity');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando Funções da camada controller na tabela sales', function () {
  it('Testando retorno de todas as sales', async function () {
    sinon.stub(salesService, 'allSales').resolves(successfulRequestAllSales);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSalesFromModel);
  });
  it('Testando retorno por id successful', async function () {
    sinon.stub(salesService, 'salesById').resolves(successfulRequestById);
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSalesByIdFromModel);
  });
  it('Testando retorno por id not found', async function () {
    sinon.stub(salesService, 'salesById').resolves(notFoundFulRequest);
    const req = {
      params: { id: 50 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testando a inserçao de sales', async function () {
    sinon.stub(salesService, 'salesInsert').resolves(succesfulInsert);
    const req = {
      body: [
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
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await validateProductId(req, res, next);
    await salesController.postSales(req, res);
    expect(next).to.have.been.calledWith();

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertFromDB);
  });
  it('Testando erro de um item não existir', async function () {
    const req = {
      body: [
        {
         
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateProductId(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  it('Testando erro de um quantidade não existir', async function () {
    const req = {
      body: [
        {
          productId: 3,
          
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('Testando erro de um quantidade menor igual a 0', async function () {
    const req = {
      body: [
        {
          productId: 3,
          quantity: 0,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  afterEach(function () {
    sinon.restore();
  });
});