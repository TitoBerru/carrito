const express = require('express');
const router = express.Router();
const ApiSeleccion = require('../Apis/ApiSeleccion');


router.get('/', ApiSeleccion.lista);
router.get('/:id', ApiSeleccion.uno);


module.exports = router;