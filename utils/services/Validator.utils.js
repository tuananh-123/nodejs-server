const { guidRegex, emailRegex, passwordRegex } = require('../models/Regexs');
const Exception      = require('../models/Error');
const { HttpStatus, DataType } = require('../models/Enums');

class Validator {
	
	validateRequiredField    = (fieldValue, fieldName)           => 	{ if (fieldValue === undefined || fieldValue === null) throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName} is required!`); };
	validateEmptyField       = (fieldValue, fieldName)           => 	{ if (fieldValue === "") throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName} is not allowed to be empty!`); };
	validateEmailField       = (fieldValue, fieldName)           => 	{ if (!emailRegex.test(fieldValue)) throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName} is not a valid email!`); };
	validatePasswordField    = (fieldValue, fieldName)           =>		{ if (!passwordRegex.test(fieldValue)) throw new Exception(HttpStatus.BAD_REQUEST, `Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.`);};																
	validateTypeOfField      = (fieldValue, fieldName, desType)  => 	{
																			const type = typeof fieldValue;
																			if (type !== desType) throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName} is not a valid type! Expected type is ${desType}, but received ${type}.`);
																			// switch (type){
																				// case DataType.OBJECT:
																					// if (fieldValue instanceof Date) {}
																					// break;
																				// default:
																					// if (type !== desType) throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName} is not a valid type! Expected type is ${desType}, but received ${type}.`);
																					// break;
																			// }																		
																			
																		};
	validateLengthField      = (fieldValue, fieldName, min, max) => 	{
																			if (fieldValue.length < min) throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName}'s length is less than ${min}!`);
																			if (fieldValue.length > max) throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName}'s length is greater than ${max}!`);
																		};		
	validateGuidIdField      = (fieldValue, fieldName)           =>     { if (!guidRegex.test(fieldValue)) throw new Exception(HttpStatus.BAD_REQUEST, `${fieldName} is not a valid ID!`); };
}
module.exports = new Validator();
