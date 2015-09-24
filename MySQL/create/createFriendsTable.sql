CREATE TABLE IF NOT EXISTS Xbox.friends
(
	id VARCHAR(20),
	hostId VARCHAR(10),
	Gamertag VARCHAR(24),
	GameDisplayName VARCHAR(24),
	AppDisplayName VARCHAR(24),
	Gamerscore VARCHAR(9),
	GameDisplayPicRaw VARCHAR(256),
	AppDisplayPicRaw VARCHAR(256),
	AccountTier VARCHAR(10),
	XboxOneRep VARCHAR(10),
	PreferredColor VARCHAR(256),
	TenureLevel VARCHAR(10),
	isSponsoredUser VARCHAR(8)
);
