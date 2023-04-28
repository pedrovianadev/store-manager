const express = require('express');
const { productsController } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productsController.productsList);
router.get('/:id', productsController.getByID);
router.post('/', validateName, productsController.insertProduct);

module.exports = router;