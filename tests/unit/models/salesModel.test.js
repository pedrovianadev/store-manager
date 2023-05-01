const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { salesMock, insertMock } = require('./mocks/salesModelMock');

describe('Test sales model', () => {
  afterEach(sinon.restore);
  
  it('Insert new sales', async () => {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesModel.insertSale(insertMock);

    expect(result).to.be.deep.equal(salesMock);
  });
});