const express = require('express');
const router = express.Router();
const ApiSelect = require('./../Apis/ApiSelect');
// const ApiConfirmaCompra = require('../Apis/ApiConfirmaCompra');

router.get('/', ApiSelect.lista);
router.get('/:id', ApiSelect.uno);
// router.post('/compra', ApiConfirmaCompra.compra)

module.exports = router;