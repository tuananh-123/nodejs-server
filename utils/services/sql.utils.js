
const Regex  = require('../models/Regexs');
const msql = require('mssql');
class Sql {
    getSqlType = (value) => {
        const type = typeof value;
		switch (type) {
			case "number":
				return Number.isInteger(value) ? msql.Int : msql.Float;
			case "string":
				return  Regex.guidRegex.test(value) ? msql.UniqueIdentifier : msql.NVarChar(value.length);
			case "boolean":
				return msql.Bit;
			case "object":
				if (value instanceof Date) return msql.DateTime;
				if (value === null) return msql.Null;	
				break;
			default:
				throw new Error(`Kiểu dữ liệu không được hỗ trợ: ${type}`);
		};
    };

	generateSchemeInsertQuery = (table, entity) => {
		let queryScheme = "INSERT INTO [ChatBotDB].[dbo].[@table] (@schemeField) VALUES (@schemeValue);";
		const filedQuery = Object.keys(entity).join(',');
		const valueQuery = Object.keys(entity).map(key => "@" + key).join(',');
		queryScheme = queryScheme.replace("@table", table);
		queryScheme = queryScheme.replace("@schemeField", filedQuery);
		queryScheme = queryScheme.replace("@schemeValue", valueQuery);	
		return queryScheme;
	};

	generateSchemeUpdateQuery = (table, entity) => {
		const fieldQuery = Object.keys(entity).slice(1).filter(key => entity[key] !== null && entity[key] !== undefined && entity[key] !== "").map(key => `${key} = @${key}`).join(',');
		const condition = `${Object.keys(entity)[0]} = @${Object.keys(entity)[0]}`;
		let queryScheme = `
			UPDATE [ChatBotDB].[dbo].[${table}]
			SET ${fieldQuery}
			WHERE ${condition};
		`;
		return queryScheme;
	};

}

module.exports = new Sql();