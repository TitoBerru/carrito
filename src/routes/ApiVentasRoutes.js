const express = require('express');
const router = express.Router();


const ApiVentas = require('../Apis/ApiVentas');


router.get('/',ApiVentas.lista);
router.get('/:id',ApiVentas.uno);


module.exports = router;