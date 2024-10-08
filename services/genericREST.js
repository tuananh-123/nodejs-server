const { SqlService } = require('../modules');
class GenericREST {
	constructor(TableAgent){
		this.tableAgent = TableAgent;
	}

	async _get() {}
	async _getById() {}
	
	async _post(entity, ps) {
		try {
			const query = SqlService.generateSchemeInsertQuery(this.tableAgent, entity);
			const values = Object.keys(entity).reduce((acc, key) => {
                acc[key] = entity[key];
                return acc;
            }, {});
			
			Object.keys(entity).forEach((key) => {
				if (entity[key] !== undefined && entity[key] !== null) {
					ps.input(key, SqlService.getSqlType(entity[key]));
				}
			});
		
			await ps.prepare(query);
			const result = await ps.execute(values);
			await ps.unprepare();
			
			return result;
		}catch (err) {
			console.error("Error inserting entity: ", err);
			throw err;
		}finally {
			if (ps.prepared) await ps.unprepare().catch(err => console.error("Error during unprepare: ", err));
		}
	}
	
	async _patch(){};
	
	async _put(entity, ps){
		try {
			const query = SqlService.generateSchemeUpdateQuery(this.tableAgent, entity);
			const values = Object.keys(entity).filter(key => entity[key] !== null && entity[key] !== undefined && entity[key] !== "").reduce((acc, key) => {
				acc[key] = entity[key];
				return acc;
			}, {});

			Object.keys(entity).filter(key => entity[key] !== null && entity[key] !== undefined && entity[key] !== "").forEach((key) => {
				if (entity[key] !== undefined && entity[key] !== null) {
					ps.input(key, SqlService.getSqlType(entity[key]));
				}
			});

			await ps.prepare(query);
			const result = await ps.execute(values);
			await ps.unprepare();
			
			return result;
		}catch (err) {
			console.error("Error updating entity: ", err);
			throw err;
		}finally {
			if (ps.prepared) await ps.unprepare().catch(err => console.error("Error during unprepare: ", err));
		}
	};

	async _delete(){};
}

module.exports = GenericREST;