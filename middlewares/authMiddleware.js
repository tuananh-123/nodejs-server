const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

const autheticateToken = (req, res, next) => {
	const token = req.header('Authorization');
	
	if (!token) return res.status(401).json({ error: "Authentication token is missing!" });
	
	jwt.verify(token, secretKey, (err, user) => {
		if (err) return res.status(403).json({ error: "Token is invalid!" });
		req.user = user;
		next();
	});
};

module.exports = autheticateToken;