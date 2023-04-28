const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const {
  productsService: { findAll, findById },
} = require('../../../src/services/');
const { products } = require('./mocks/productsServiceMock');

describe('test products service', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('test list products', () => {
    it('get all products', async () => {
      sinon.stub(productsModel, 'findAll').resolves(products);

      const result = await findAll();

      expect(result.message).to.deep.equal(products);
    });
  });
  describe('test search products', () => {
    it('list product if exists', async () => {
      sinon.stub(productsModel, 'findById').resolves(products[0]);

      const result = await findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });

    it('throw a error if products do not exists', async () => {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await findById(9);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
});
