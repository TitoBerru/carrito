const express = require('express');
const router = express.Router();
const path = require('path');
const apiSelect = require('../apisControllers/apiSelect');


router.get('/', apiSelect.lista);
router.get('/:id', apiSelect.uno);


module.exports = router;