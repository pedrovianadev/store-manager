const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesError, salesSucess } = require('./mocks/salesControllerMock');

describe('Test sales controller', () => {
  afterEach(sinon.restore);
  
  it('New sales successufully', async () => {
    const res = {};
    const req = { body: salesSucess.itemsSold };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'insertSale')
      .resolves({ type: null, message: salesSucess });

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesSucess);
  });
  it('New sales error', async () => {
    const res = {};
    const req = { body: salesSucess.itemsSold };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'insertSale').resolves(salesError);

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: salesError.message });
  });
});
