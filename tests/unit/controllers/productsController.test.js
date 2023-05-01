const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productMockController } = require('./mocks/productsControllerMock');

describe("test products controller", () => {
  afterEach(sinon.restore);

  it('list products', async () => {
    const req = {};
    const res = {};
    const products = [productMockController];

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAll')
      .resolves({
        type: null,
        message: products,
      });
    
    await productsController.productsList(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(products);
  });

  it('search for a products', async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById')
      .resolves({
        type: null,
        message: productMockController,
      });
    
    await productsController.getByID(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(productMockController);
  });

  it('Throw a error if products do not exists', async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById')
      .resolves({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      });
    
    await productsController.getByID(req, res);

    expect(res.status).to.have.been.calledWith(404);

    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Insert a new Product', async () => {
    const req = {
      body: {
        name: 'ProdutoX',
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'insertProduct')
      .resolves({
        type: null,
        message: productMockController,
      });

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMockController);
  });
});