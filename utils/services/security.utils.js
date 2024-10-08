const argon2 = require('argon2');
const { HttpStatus, Exception } = require('../../modules');

class Security {
	
	hashPassword_argon2 = async (password) => {
		try {
			const hash = await argon2.hash(password);
			return hash;
		}catch (err){
			throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi trong quá trình thực hiện yêu cầu. Vui lòng thử lại sau!");
		}
	}	
}

module.exports = new Security();