const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const {
  productsService: { findAll, findById, insertProduct },
} = require('../../../src/services/');
const { products } = require('./mocks/productsServiceMock');

describe('Test products service', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('Test list products', () => {
    it('Get all products', async () => {
      sinon.stub(productsModel, 'findAll').resolves(products);

      const result = await findAll();

      expect(result.message).to.deep.equal(products);
    });
  });
  describe('Test search products', () => {
    it('List product if exists', async () => {
      sinon.stub(productsModel, 'findById').resolves(products[0]);

      const result = await findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });

    it('Throw a error if products do not exists', async () => {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await findById(9);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
  describe('Test insert products', () => {
    it('Returns inserted product', async () => {
      sinon.stub(productsModel, 'insertProduct').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(products[0]);

      const result = await insertProduct('Martelo de Thor');

      expect(result.type).to.be.deep.equal(null);
      expect(result.message).to.be.deep.equal(products[0]);
    });
  });
});
