class User {
	constructor(UserID, UserName, Email, DateJoined, LastLogin){
		this.userID = UserID,
		this.userName = UserName,
		this.email = Email,
		this.dateJoined = DateJoined,
		this.lastLogin = LastLogin
	}
	
	static fromData(data) {
		return new User(
			data.UserID,
			data.UserName,
			data.Email,
			data.DateJoined,
			data.LastLogin
		);
	}
}

module.exports = User;
