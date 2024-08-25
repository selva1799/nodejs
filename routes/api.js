const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');

// CRUD routes
router.get('/products', productController.list);
router.post('/products', productController.upload, validateProduct, productController.create); // Added productController.upload middleware
router.get('/products/:id', productController.view);
router.put('/products/:id', productController.upload, validateProduct, productController.update); // Added productController.upload middleware
router.delete('/products/:id', productController.destroy);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const { validateProduct } = require('../middleware/validation');

// // CRUD routes
// router.get('/products', productController.list);
// router.post('/products', productController.upload, validateProduct, productController.create); // Added productController.upload middleware
// router.get('/products/:id', productController.view);
// router.put('/products/:id', productController.upload, validateProduct, productController.update); // Added productController.upload middleware
// router.delete('/products/:id', productController.destroy);

// module.exports = router;
