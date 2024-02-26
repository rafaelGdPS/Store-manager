const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { successfulRequestAllSales, getSalesFromModel, successfulRequestById, getSalesByIdFromModel, notFoundFulRequest } = require('../Mocks/sales');
const { salesController } = require('../../../src/controllers');

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

  afterEach(function () {
    sinon.restore();
  });
});