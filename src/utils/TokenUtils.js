import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class TokenUtils {
	static createToken(data) {
		dotenv.config();
		return jwt.sign(data, process.env.JWT_KEY);
	}
	
	static decodeToken(token) {
		dotenv.config();
		return jwt.verify(token,  process.env.JWT_KEY);  
	}
}
