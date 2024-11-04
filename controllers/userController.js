const User = require('../models/userModel');
const { pool } = require('../DBContext/dbContext');
const sql = require('mssql');

const getUser = async (req, res) => {
	try{
		const request = new sql.Request(pool);
		const result = await request.query('select * from [ChatBotDB].[dbo].[User]');
		const users = result.recordset.map(data => User.insert(data))
		
		res.status(200).json(users);
	}catch (err){
		console.error(err);
		res.status(500).json({ error: "Server error: " + err });
	}
};

const getUserById = async (req, res) => {
	try{
		const id = parseInt(req.params.id);
		console.log(id);
		
		const request = new sql.Request(pool);
		request.input('id', sql.Int, id);
		const result = await request.query('select * from [ChatBotDB].[dbo].[User] where UserID = @id');
		const users = result.recordset.map(data => User.insert(data))
		
		res.status(200).json(users);
	}catch (err){
		console.error(err);
		res.status(500).json({ error: "Server error: " + err });
	}
};

// const getUserById = async (req, res) => {
	// try{
		// const id = parseInt(req.params.id);
		// console.log(id);
		
		// const request = new sql.Request(pool);
		// request.input('id', sql.Int, id);
		// const result = await request.query('select * from [ChatBotDB].[dbo].[User] where UserID = @id');
		// const users = result.recordset.map(data => User.fromData(data))
		
		// res.status(200).json(users);
	// }catch (err){
		// console.error(err);
		// res.status(500).json({ error: "Server error: " + err });
	// }
// };

module.exports = { getUser, getUserById };
