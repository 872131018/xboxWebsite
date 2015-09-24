CREATE TABLE IF NOT EXISTS Xbox.gamercard
(
	gamertag VARCHAR(24),
	name VARCHAR(20),
	location VARCHAR(30),
	bio VARCHAR(256),
	gamerscore VARCHAR(9),
	tier VARCHAR(10),
	motto VARCHAR(256),
	avatarBodyImagePath VARCHAR(256),
	gamerpicSmallImagePath VARCHAR(256),
	gamerpicLargeImagePath VARCHAR(256),
	gamerpicSmallSslImagePath VARCHAR(256),
	gamerpicLargeSslImagePath VARCHAR(256),
	avatarManifest VARCHAR(2048),
	PRIMARY KEY(gamertag)
);
