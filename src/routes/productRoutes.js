const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController');

// Middlewares
const multer = require('multer'); // Requiero el multer para poder luego subir las imagenes y tratarlas.

// Tratamiento de Imagenes
const multerDiskStorage = require('../../middlewares/multerDiskStorage');
const uploadFile = multer({ storage: multerDiskStorage });

// Rutas //

router.get('/producto', productController.listado);

router.get('/cargaProducto', productController.carga);
router.post('/cargaProducto', uploadFile.single('imagenProducto'), productController.store);

router.get('/carrito/:id', productController.carrito_ok);
router.get('/carritoConfirm/:id',productController.carrito);

//Ruta de precompra
router.get('/preCompra',productController.preCompra);
router.post('/preCompra', productController.preCompra);

//Ruta de compra
router.post('/compra', productController.compra);


/*** EDITAR PRODUCTO ***/
router.get('/edicionProducto/:id?', productController.edicion);
router.put('/edicionProducto/:id', uploadFile.single('imagenProducto'), productController.actualizar);

router.delete('/:id', productController.destroy);

module.exports = router;







