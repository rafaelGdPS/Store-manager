const sinon = require('sinon');
const { expect } = require('chai');
const { salesModels } = require('../../../src/models');
const { getSalesFromDb, getSalesFromModel, getSalesByIdFromDb, getSalesByIdFromModel, insertFromDB } = require('../Mocks/sales');
const { salesService } = require('../../../src/services');

describe('Testando as Funções da camada service para a tabela sales', function () {
  it('Testando o retorno de todas as sales', async function () {
    sinon.stub(salesModels, 'findAll').resolves(getSalesFromDb);

    const responseService = await salesService.allSales();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(getSalesFromModel);
  });
  it('Testando retorno da sale por id', async function () {
    sinon.stub(salesModels, 'findById').resolves(getSalesByIdFromDb);

    const responseService = await salesService.salesById(1);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(getSalesByIdFromModel);
  });
  it('Testando se retorna erro por id inexistente', async function () {
    sinon.stub(salesModels, 'findById').resolves([]);

    const responseService = await salesService.salesById(45);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Sale not found' });
  });
  it('Testando validaçoes na inserção', async function () {
    sinon.stub(salesModels, 'insert').resolves(insertFromDB);
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
    const responseService = await salesService.salesInsert(sales);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(insertFromDB);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});