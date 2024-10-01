USE master;
DROP DATABASE IF EXISTS ChatBotDB;
GO

CREATE DATABASE ChatBotDB;
GO

USE ChatBotDB;
GO

CREATE TABLE [User] (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    DateJoined DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE [ChatSession] (
    SessionID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    StartTime DATETIME DEFAULT GETDATE(),
    EndTime DATETIME NULL,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);
GO

CREATE TABLE [Message] (
    MessageID INT IDENTITY(1,1) PRIMARY KEY,
    SessionID INT,
    Sender NVARCHAR(10) CHECK (Sender IN ('User', 'Bot')) NOT NULL,
    Timestamp DATETIME DEFAULT GETDATE(),
    Content NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES ChatSession(SessionID)
);
GO


