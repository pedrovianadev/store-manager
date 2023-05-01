const express = require('express');
const { salesController } = require('../controllers');
const validateProductId = require('../middlewares/validateProductId');
const validateQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.get('/', salesController.allSales);
router.get('/:id', salesController.salesById);
router.post('/', validateQuantity, validateProductId, salesController.insertSales);

module.exports = router;
