import bcrypt from "bcrypt";

/* constants */
import { SETTINGS } from "../const/settings.js";

export function compareEncrypt(value, hash) {
	return bcrypt.compareSync(value, hash);
}

export function hashEncrypt(password) {
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(SETTINGS.ENCRYPT_SALT));
	return hashedPassword;
}