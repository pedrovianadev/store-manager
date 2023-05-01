const express = require('express');
const { salesController } = require('../controllers');
const validateProductId = require('../middlewares/validateProductId');
const validateQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.post('/', validateQuantity, validateProductId, salesController.insertSales);

module.exports = router;
