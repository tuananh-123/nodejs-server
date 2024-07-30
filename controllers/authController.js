const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {body , validationResult } = require('express-validator');
const users = require('../models/userModel');
const { secretKey } = require('../config/config');
const value = 2;
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
		console.log(req.body);
		const errors = validationResult(req);
		console.log(errors);
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

module.exports = { login };