require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3000,
	hostName: process.env.HOST_NAME || '127.0.0.1',
	secretKey: process.env.SECRET_KEY || 's1mple-k3y'
}