const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services/');
const { salesMock, insertMock } = require('./mocks/salesServiceMock');

describe('Test sales service', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Insert tables successfully', async () => {
    sinon.stub(salesModel, 'insertSale').resolves(salesMock);

    const result = await salesService.insertSale(insertMock);

    expect(result.type).to.equal(null);

    expect(result.message).to.deep.equal(salesMock);
  });

  it('Insert sales error', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const salesInsert = await salesService.insertSale([insertMock[0]]);

    expect(salesInsert.type).to.equal('PRODUCT_NOT_FOUND');
    
    expect(salesInsert.message).to.equal('Product not found');
  });
});
