require('dotenv').config();
const express = require('express');
const { port, hostName } = require('./config/config');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.send("Hello, Express!");
});

app.listen(port, () => {
	console.log(`Server listening on http://${hostName}:${port}/`);
})