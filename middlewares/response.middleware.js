const { HttpStatus } = require('../utils/models/Enums');
const responseMiddleware = (req, res) => {
	return res.status(res.locals.statusCode).json({
		"message": res.locals.message,
		"data"   : res.locals.data,
		"status" : 'Successed'
	});
};

module.exports = responseMiddleware;