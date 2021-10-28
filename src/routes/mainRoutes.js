const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const path = require('path');
const multer = require('multer'); // Requiero el multer para poder luego subir las imagenes y tratarlas.
const { body } = require('express-validator');

router.get('/', mainController.index);
router.get('/quienesSomos', mainController.quienesSomos);

module.exports = router;