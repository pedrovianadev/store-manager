const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products } = require('./mocks/productsModelMock');

describe('Test products model', () => {
  afterEach(sinon.restore);

  it('Get all products', async () => {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.findAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Get product by id', async () => {
    sinon.stub(connection, "execute").resolves([[products[0]]]);

    const result = await productsModel.findById(1);

    expect(result).to.be.deep.equal(products[0]);
  });
});
