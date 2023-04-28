const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.productsList);
router.get('/:id', productsController.getByID);
router.post('/', productsController.insertProduct);

module.exports = router;