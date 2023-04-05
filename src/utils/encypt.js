const bcrypt = require("bcrypt");

/* constants */
const { SETTINGS } = require("../const/settings");

function compareEncrypt(value, hash) {
	return bcrypt.compareSync(value, hash);
}

function hashEncrypt(password) {
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(SETTINGS.ENCRYPT_SALT));
	return hashedPassword;
}

module.exports = {
	compareEncrypt,
	hashEncrypt,
};
