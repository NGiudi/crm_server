import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createToken(data) {
	return jwt.sign(data, process.env.JWT_KEY);
}

export function decodeToken(token) {
	return jwt.verify(token,  process.env.JWT_KEY);  
}