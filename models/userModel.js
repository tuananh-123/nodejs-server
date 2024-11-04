const { randomUUID } = require('crypto');
const { guidRegex, emailRegex } = require('../utils/models/Regexs');
const Validator = require('../utils/services/Validator.utils');
const DataType = require('../utils/models/Enums').DataType;
const Convert = require('../utils/services/convert.utils');
const Security = require('../utils/services/security.utils');

class User {
	constructor(UserID, UserName, Email, EmailVerified, PasswordHash, DateJoined, LastLogin, SubscriptionType){
		this.UserID = UserID,
		this.UserName = UserName,
		this.Email = Email,
		this.EmailVerified = EmailVerified,
		this.PasswordHash = PasswordHash,
		this.DateJoined = DateJoined,
		this.LastLogin = LastLogin,
		this.SubscriptionType = SubscriptionType
	}  
	
	static async insert(data) {
		const configs = {
			"UserName": {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.STRING]},
					{fn: Validator.validateEmptyField,    params: []},
					{fn: Validator.validateLengthField,   params: [3, 15]},
				]
			},
			"Email": {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.STRING]},
					{fn: Validator.validateEmptyField,    params: []},
					{fn: Validator.validateEmailField,    params: []},
				]
			},
			"EmailVerified" : {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.BOOLEAN]},
					{fn: Validator.validateEmptyField,    params: []},
				]
			},
			"PasswordHash" : {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.STRING]},
					{fn: Validator.validateEmptyField,    params: []},
					{fn: Validator.validatePasswordField, params: []}
				]
			},
			"DateJoined": {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.NUMBER]},
					{fn: Validator.validateEmptyField,    params: []},
				]
			},
			"LastLogin": {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.NUMBER]},
					{fn: Validator.validateEmptyField,    params: []},
				]
			},
			"SubscriptionType": {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.NUMBER]},
					{fn: Validator.validateEmptyField,    params: []},
				]
			}
		};
		
		const validateField = (key, value) => {
			const validations = configs[key].validations;
			validations.forEach(validation => {
				const params = validation.params;
				validation.fn(value, key, ...params);
			});
		};
		
		const createUser = async (data) => {
			try {
				const user = new User(
						randomUUID(),
						data.UserName,
						data.Email,
						data.EmailVerified,
						await Security.hashPassword_argon2(data.PasswordHash),
						Convert.timestampToDate_vn(data.DateJoined)          ,							
						Convert.timestampToDate_vn(data.LastLogin) 			 ,
						data.SubscriptionType
					);
				return user;
			} catch (err){
				throw err;
			}
		};
		
		Object.keys(configs).forEach(key => validateField(key, data[key]));
	
		const user = await createUser(data);
		
		return user;
	};
	
	static async patch(data, config){
		const configs = {
			"UserID": {
				validations: [
					{fn: Validator.validateRequiredField, params: []},
					{fn: Validator.validateTypeOfField,   params: [DataType.STRING]},
					{fn: Validator.validateGuidIdField,   params: []},
				]
			}
		};

		const validateField = (key, value) => {
			const validations = configs[key].validations;
			validations.forEach(validation => {
				const params = validation.params;
				validation.fn(value, key, ...params);
			});
		};
		
		const createUser = async (data) => {
			try {
				const user = new User(
						data.UserID,
						data.UserName,
						data.Email,
						data.EmailVerified,
						data.PasswordHash ? await Security.hashPassword_argon2(data.PasswordHash) : undefined,
						data.DateJoined ? Convert.timestampToDate_vn(data.DateJoined) : undefined,							
						data.LastLogin ? Convert.timestampToDate_vn(data.LastLogin) : undefined,
						data.SubscriptionType
					);
				return user;
			} catch (err){
				throw err;
			}
		};

		Object.keys(configs).forEach(key => validateField(key, data[key]));
		
		const user = await createUser(data);
		
		return user;

	};

	static getFieldNames() {
		return ['UserID', 'UserName', 'Email', 'EmailVerified', 'PasswordHash', 'DateJoined', 'LastLogin', 'SubscriptionType'];
	};


}

module.exports = User;
