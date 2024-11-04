class ChatSession{
	constructor(SessionID, UserID, StartTime, EndTime){
		this.sessionID = sessionID,
		this.userID = userID,
		this.startTime = StartTime,
		this.endTime = EndTime
	}
	
	static fromData(data){
		return new ChatSession(
			data.SessionID,
			data.UserID,
			data.StartTime,
			data.EndTime
		)
	}
	
}