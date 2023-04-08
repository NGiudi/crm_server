const jwt = require("jsonwebtoken");

/* models */
const { Users } = require("../models/connectionsModel");

/* constants */
const { MESSAGES } = require("../const/responses");

/*
  Middleware: authLoggedInUser

  Descripción:
    Este middleware es utilizado para autenticar y autorizar a los usuarios de una 
    aplicación web. Comprueba si el usuario está activo. También comprueba si el 
    token proporcionado en los encabezados de la solicitud es válido.
*/
const authLoggedInUser = () => async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token)
		return res.status(401).json({ message: MESSAGES.TOKEN_REQUIRED });

	try {
		const decodedToken = jwt.verify(token,  process.env.JWT_KEY);    

		const user = await Users.findByPk(decodedToken.user_id, {
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
		console.log("error en middleware");
		return res.status(500).json();
	}
};

/*
  Middleware: authRoleMiddleware

  Descripción:
    Este middleware es utilizado para autenticar y autorizar a los usuarios de una 
    aplicación web. Recibe como parámetro el rol requerido para acceder a una determinada 
    ruta y comprueba si el usuario tiene ese rol y si está activo. También comprueba si el 
    token proporcionado en los encabezados de la solicitud es válido.
*/
const authRoleMiddleware = (role) => async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token)
		return res.status(401).json({ message: MESSAGES.TOKEN_REQUIRED });

	try {  
		const decodedToken = jwt.verify(token,  process.env.JWT_KEY);    

		const user = await Users.findByPk(decodedToken.user_id, {
			attributes: { 
				include: ["token", "role"],
			}
		});

		const isMe = req.params.id && parseInt(req.params.id) === decodedToken.user_id; 

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
};

module.exports = {
	authLoggedInUser,
	authRoleMiddleware,	
};