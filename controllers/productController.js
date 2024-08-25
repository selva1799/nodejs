const Product = require('../models/product');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(file.originalname.toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('File type not supported'));
    }
}).single('imageUrl'); // Ensure this matches the form-data field name in Postman

// CRUD Operations
const list = async (req, res) => {
    try {
        let result = await Product.find();
        res.status(200).json({
            status: true,
            message: `${result.length} record(s) found`,
            result: result
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to fetch records',
            error: error.message
        });
    }
};

const create = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            status: false,
            message: 'Name and price are required fields'
        });
    }

    const data = {
        name,
        price,
        description,
        imageUrl
    };

    try {
        let result = await Product.create(data);
        res.status(201).json({
            status: true,
            message: 'Created successfully',
            result: result
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to create record',
            error: error.message
        });
    }
};

const view = async (req, res) => {
    try {
        let result = await Product.findById(req.params.id);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Record found',
                result: result
            });
        } else {
            res.status(404).json({
                status: false,
                message: 'Record not found',
                result: null
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to fetch record',
            error: error.message
        });
    }
};

const update = async (req, res) => {
    const { name, price, description, imageUrl } = req.body;

    const data = {
        name,
        price,
        description,
        imageUrl
    };

    try {
        let result = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Updated successfully',
                result: result
            });
        } else {
            res.status(404).json({
                status: false,
                message: 'Record not found',
                result: null
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to update record',
            error: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        let result = await Product.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Deleted successfully',
                result: result
            });
        } else {
            res.status(404).json({
                status: false,
                message: 'Record not found',
                result: null
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to delete record',
            error: error.message
        });
    }
};

const uploadImage = async (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                status: false,
                message: err.message
            });
        }

        Product.findByIdAndUpdate(req.params.id, { imageUrl: req.file.path }, { new: true }, (err, result) => {
            if (err || !result) {
                return res.status(500).json({
                    status: false,
                    message: 'Failed to upload image',
                    error: err ? err.message : 'Record not found'
                });
            }

            res.status(200).json({
                status: true,
                message: 'Image uploaded successfully',
                result: result
            });
        });
    });
};

module.exports = {
    list,
    create,
    view,
    update,
    destroy,
    upload,
    uploadImage
};
