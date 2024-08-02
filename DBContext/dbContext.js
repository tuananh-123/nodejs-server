const sql = require('mssql');
const { db_server, db_database, db_user, db_password } = require('../config/config');

const config = {
	user: db_user,
	password: db_password,
	server: db_server,
	database: db_database,
	options: {
		encrypt: true,
		trustServerCertificate: true
	}
};

const pool = new sql.ConnectionPool(config);

pool.on('error', err => {
	console.error(err);
})

const closeConnectionPool = () => {
	pool.close();
}

module.exports = { closeConnectionPool, pool };