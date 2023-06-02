import bcrypt from "bcrypt";

/* constants */
import { SETTINGS } from "../const/settings.js";

export class EncryptUtils {
	static compareEncrypt(value, hash) {
		return bcrypt.compareSync(value, hash);
	}

	static hashEncrypt(password) {
		const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(SETTINGS.ENCRYPT_SALT));
		return hashedPassword;
	}
}
