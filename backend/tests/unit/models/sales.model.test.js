const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { getSalesFromDb, getSalesFromModel, getSalesByIdFromDb, getSalesByIdFromModel, insertFromDB } = require('../Mocks/sales');
const { salesModels } = require('../../../src/models');

describe('Testando funções de sales na camada model', function () {
  it('Testando função de  busca por todos as sales', async function () {
    sinon.stub(connection, 'execute').resolves([getSalesFromDb]);

    const responseModel = await salesModels.findAll();
    expect(responseModel).to.deep.equal(getSalesFromModel);
  });
  it('Testando funçao de busca por id da tabela sales', async function () {
    sinon.stub(connection, 'execute').resolves([getSalesByIdFromDb]);
    const responseModel = await salesModels.findById(1);
    expect(responseModel).to.deep.equal(getSalesByIdFromModel);
  });
  it('Testando inserção de sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const sales = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const responseModel = await salesModels.insert(sales);
    expect(responseModel).to.deep.equal(insertFromDB);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});