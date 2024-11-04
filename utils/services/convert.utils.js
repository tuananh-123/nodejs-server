class Convert {
	timestampToDate_global = (timestamp) => {
		return new Date(timestamp * 1000);
	}
	
	timestampToDate_vn = (timestamp) => {
		const date = new Date(timestamp * 1000);
		date.setHours(date.getHours() + 7);
		return date;
	}
}

module.exports = new Convert();