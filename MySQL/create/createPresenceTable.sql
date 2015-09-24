CREATE TABLE IF NOT EXISTS Xbox.presence
(
	xuid VARCHAR(20),
	state VARCHAR(10),
	deviceType VARCHAR(10),
	titleId VARCHAR(20),
	name VARCHAR(36),
	placement VARCHAR(10),
	stateOfApp VARCHAR(16),
	lastModified VARCHAR(36),
	PRIMARY KEY(xuid)
);
