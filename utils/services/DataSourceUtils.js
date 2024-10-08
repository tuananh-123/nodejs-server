const { pool } = require('../../DBContext/dbContext');
const sql = require('mssql');

const user_emailExisted = async (email) => {
	const ps = new sql.PreparedStatement(pool);
	try {
		ps.input('email', sql.VarChar(50));
		const query = 'select 1 from [ChatBotDB].[dbo].[User] as u where u.Email = @email';
		await ps.prepare(query);
		const result = await ps.execute({email});
		await ps.unprepare();
		return result.recordset.length > 0;
	} catch (err) {
		console.error("Error checking email existence: ", err);
		throw err;
	} finally {
		if (ps.prepared) await ps.unprepare().catch(err => console.error("Error during unprepare: ", err));
	}
};

module.exports = {
	user_emailExisted
};