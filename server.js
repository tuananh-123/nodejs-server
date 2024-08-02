require('dotenv').config();
const express = require('express');
const { port, hostName, db_server, db_database, db_user, db_password } = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const { pool } = require('./DBContext/dbContext');
const sql = require('mssql');
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
	res.send("Hello, Express!");
});

const startServer = async () => {
    try {
        await pool.connect();
        app.listen(port, () => {
            console.log(`Server listening on http://${hostName}:${port}/`);
        });
    } catch (err) {
        console.error('Failed to connect to database:', err);
    }
};

startServer();