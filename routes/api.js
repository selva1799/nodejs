// In routes/api.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust path if necessary

//  router = async (app) => {
//     app.get('/user', userController.list)
//     app.post('/user', userController.create)
//     app.get('/user/:id', userController.view)
//     app.put('/user/:id', userController.update)
//     app.delete('/user/:id', userController.destroy)
// }



router.get('/user', userController.list);
router.post('/user', userController.create);
router.get('/user/:id', userController.view)
router.put('/user/:id',userController.update);
router.delete('/user/:id', userController.destroy);


module.exports = router;




// const express = require('express');
// const multer = require('multer');
// const userController = require('../controllers/userController');

// const router = express.Router();

// // Configure Multer for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024  1024  5 // 5 MB file size limit
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
//             cb(null, true);
//         } else {
//             cb(new Error('Only JPEG, JPG and PNG files are allowed'), false);
//         }
//     }
// });




// module.exports = router;
