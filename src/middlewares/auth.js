import { Users } from "../models/database/tablesConnection.js";
import { MESSAGES } from "../const/responses.js";
import { Utils } from "../utils/index.js";

export class Authentication {
	constructor() {
	
	}

	async authActiveUser(req, res, next) {
		if (!req.body || !req.body.email)
			return res.status(400).json({ message: MESSAGES.QUERY_BODY_REQUIRED });
	
		let user = null;
	
		try {
			user = await Users.findOne({
				attributes: {
					include: ["token", "role"],
				},
				where: { email: req.body.email},
			});
			
			if (!user)
				return res.status(401).json({ message: MESSAGES.USER_NOT_FOUND });
	
			if (!user.active)
				return res.status(401).json({ message: MESSAGES.USER_INACTIVE });
			
			next();
		} catch {
			return res.status(500).json();
		}
	};
	
	async authLoggedInUser(req, res, next) {
		const token = req.headers.authorization;

		if (!token)
			return res.status(401).json({ message: MESSAGES.TOKEN_REQUIRED });
	
		try {
			const decoded = Utils.tokens.decodeToken(token);

			const now = new Date();
	
			if (now > decoded.expired_at)
				return res.status(403).json({ message: MESSAGES.USER_UNAUTHORIZED });
	
			const user = await Users.findByPk(decoded.user_id, {
				attributes: { 
					include: ["token", "role"],
				}
			});
	
			if (!user || user.token !== token)
				return res.status(401).json({ message: MESSAGES.INVALID_TOKEN });
	
			if (!user.active)
				return res.status(401).json({ message: MESSAGES.USER_INACTIVE });
	
			next();
		} catch {
			return res.status(500).json();
		}
	};
	
	authRoleMiddleware(role) {
		return async (req, res, next) => {
			const token = req.headers.authorization;
		
			if (!token)
				return res.status(401).json({ message: MESSAGES.TOKEN_REQUIRED });
		
			try {  
				const decoded = Utils.tokens.decodeToken(token);   
				const now = new Date();
		
				if (now > decoded.expired_at)
					return res.status(403).json({ message: MESSAGES.USER_UNAUTHORIZED });
		
				const user = await Users.findByPk(decoded.user_id, {
					attributes: { 
						include: ["token", "role"],
					}
				});
		
				const isMe = req.params.id && parseInt(req.params.id) === decoded.user_id; 
		
				if (!user || user.token !== token)
					return res.status(401).json({ message: MESSAGES.INVALID_TOKEN });
		
				if (!user.active)
					return res.status(401).json({ message: MESSAGES.USER_INACTIVE });
		
				if (user.role !== role && !isMe)
					return res.status(403).json({ message: MESSAGES.USER_UNAUTHORIZED });
		
				next();
			} catch {
				return res.status(500).json();
			}
		}
	};
}
