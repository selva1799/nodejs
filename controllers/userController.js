const User = require('../models/user');

const list = async (req, res) => {
    try {
        let result = await User.find();
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
    const request = req.body;

    const data = {
        firstname: request.firstname,
        lastname: request.lastname,
        dob: request.dob,
        email: request.email,
        phone: request.phone,
    };

    try {
        let result = await User.create(data);
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
        let result = await User.findById(req.params.id);
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
    const request = req.body;

    const data = {
        firstname: request.firstname,
        lastname: request.lastname,
        dob: request.dob,
        email: request.email,
        phone: request.phone,
    };

    try {
        let result = await User.findByIdAndUpdate(req.params.id, data, { new: true });
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
        let result = await User.findByIdAndDelete(req.params.id);
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

module.exports = {
    list,
    create,
    view,
    update,
    destroy
};
