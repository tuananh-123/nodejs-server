const { HttpStatus } = require('../utils/models/Enums');

const Upload = async (req, res, next) => {
    try {   
        res.locals.statusCode = HttpStatus.OK;
        res.locals.message    = "Upload file successfully";
        res.locals.data       =  req.file;
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = {
    Upload
}