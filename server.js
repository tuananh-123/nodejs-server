require('dotenv').config();
const express = require('express');
const { port, hostName, server, database } = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const Connection = require('tedious').Connection;
var net = require('net');
var config = {
	server: '127.0.0.1',		
	options: {
    port: 1433 // Default Port
	database: 'ChatBotDB'
			trustedConnection: true
  }
		
};

const connection = new Connection(config);

connection.connect((err) => {
  if (err) {
    console.log('Connection Failed');
    throw err;
  }

  console.log('Custom connection Succeeded');
});

// var connection = new Connection(config);  
// connection.on('connect', function(err) {  
	// // If no error, then good to proceed.
	// if (err){ console.error(err); throw err; }
	// console.log("Connected");  
// });

// connection.connect();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

app.get('/', (req, res) => {
	res.send("Hello, Express!");
});

app.listen(port, () => {
	console.log(`Server listening on http://${hostName}:${port}/`);
})