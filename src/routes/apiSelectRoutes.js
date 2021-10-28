const express = require('express');
const router = express.Router();
const path = require('path');
const apiSelect = require('../controllers/apiSelect');
// const ApiConfirmaCompra = require('../Apis/ApiConfirmaCompra');

router.get('/', apiSelect.lista);
router.get('/:id', apiSelect.uno);
// router.post('/compra', ApiConfirmaCompra.compra)

module.exports = router;