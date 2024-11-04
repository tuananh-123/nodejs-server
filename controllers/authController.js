const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {body , validationResult } = require('express-validator');
const users = require('../models/userModel');
const { secretKey } = require('../config/config');
const { user_emailExisted } = require('../utils/services/DataSourceUtils');
const { HttpStatus } = require('../utils/models/Enums');
const sql = require('mssql');
const { pool } = require('../DBContext/dbContext');
const userService = require('../services/user.service');
const User = require('../models/userModel');
const { randomUUID } = require('crypto');
const testService = require('../utils/services/test');

const authenticateUser = (username, password) => {
	const user = users.find(x => x.username === username);
	if (!user) return null;
	const isPasswordCorrect = bcrypt.compareSync(password, user.password);
	if (isPasswordCorrect) return user;
	return null;
};

const login = [
	body('username').isString(),
	body('password').isString(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			return res.status(400).json({ error: errors.array() });
		}
		
		const { username, password } = req.body;
		
		const user = authenticateUser(username, password);
		
		if (!user) return res.status(404).json({ error: "Authentication failed!" });
		
		const token  = jwt.sign({ userId: user.id, username: user.username }, secretKey, {
			expiresIn: '1h'
		})
		
		return res.status(200).json({ token });	
	}
];

const verifyEmail = async (req, res) => {
	try {
		const email = req.query.email;
		
		if (!email) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Email is required',
                continue_signup: false
            });
        }
		
		const result = await user_emailExisted(email);
		
		if (result){
			const fail_response = {
				"email_existed": true,
				"rollbackTo_login": true,
				"continue_signup": false,
				"email_requested": email,
			};
			
			return res.status(HttpStatus.CONFLICT).json(fail_response);
		}
		
		const sucess_response = {
			"email_existed": false,
			"rollbackTo_login": false,
			"continue_signup": true,
			"email_requested": email,
		}
		
		return res.status(HttpStatus.OK).json(sucess_response);
		
	}catch (err) {
		console.log("Error verifying email: ", err);
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			message: "Server error, try again later!"
		});
	}
};

const signUp = async (req, res, next) => {
	const transaction = new sql.Transaction(pool);
	const ps = new sql.PreparedStatement(transaction);
	try {
		
		await transaction.begin();
		const user = await User.insert(req.body);
		
		console.log(user);
		
		const user_service = new userService("User");
		
		var result = await user_service._post(user, ps);
			
		await transaction.commit();
		
		res.locals.statusCode = HttpStatus.OK;
		res.locals.message    = "Insert successfully";
		res.locals.data       = {};
		
		next();
	}catch (err) {
		await transaction.rollback();
		next(err);
	}
}

const test = async (req, res) => {
	try {
		
		const text = "oi doi oi!";
		let content = "";
		let index = 0;
		const speed = 1; // Tốc độ truyền từng ký tự (ms)
		
		// Thiết lập header để cho phép streaming
		res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
		res.setHeader('Cache-Control', 'no-cache');
		res.setHeader('Keep-Alive', 'timeout=10');
		
		const intervalId = setInterval(() => {
			if (index < text.length){
				content += text[index++];
				res.write(`data: ${content}\n\n`);
			}else {
				clearInterval(intervalId);
                res.end();
			}
		}, speed);

		req.on('close', () => {
			clearInterval(intervalId);
			res.status(200).end();
		})
	}catch (err){
		next(err);
	}
}

const updateUser = async (req, res, next) => {
	const transaction = new sql.Transaction(pool);
	const ps = new sql.PreparedStatement(transaction);
	try {
		
		await transaction.begin();
		const user = await User.patch(req.body);
		
		console.log(user);
		
		const user_service = new userService("User");
		
		var result = await user_service._put(user, ps);
			
		await transaction.commit();
		
		res.locals.statusCode = HttpStatus.OK;
		res.locals.message    = "Update successfully";
		res.locals.data       = {};
		
		next();
	}catch (err) {
		await transaction.rollback();
		next(err);
	}
};

module.exports = { login, verifyEmail, signUp, updateUser, test };