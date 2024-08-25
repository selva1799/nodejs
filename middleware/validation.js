const validateProduct = (req, res, next) => {
    const { name, description } = req.body;
    const price = parseFloat(req.body.price);

    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 50) {
        return res.status(400).json({
            status: false,
            message: 'Name must be between 3 and 50 characters'
        });
    }

    if (isNaN(price) || price < 0) {
        return res.status(400).json({
            status: false,
            message: 'Price must be a positive number'
        });
    }

    if (description && description.length > 500) {
        return res.status(400).json({
            status: false,
            message: 'Description cannot exceed 500 characters'
        });
    }

    next();
};

module.exports = {
    validateProduct
};
