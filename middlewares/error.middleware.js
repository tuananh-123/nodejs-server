
const errorMiddleware = (err, req, res, next) => {
	console.error("Error: ", err.message);
	
	return res.status(err.statusCode).json({
		message: err.message,
		status: "Failed"
	});
};

module.exports = errorMiddleware;