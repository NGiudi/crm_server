const router = require("express").Router();
const jwt = require("jsonwebtoken");
const lodash = require("lodash");

/* middlewares */
const { authRoleMiddleware } = require("../../middlewares/auth");

/* utils */
const { compareEncrypt, hashEncrypt } = require("../../utils/encypt");
const { isEmptyObject } = require("../../utils/objects");
const { getTableStats } = require("../../utils/tables");
const { parseToInt } = require("../../utils/numbers");

/* models */
const { Addresses, Users } = require("../../models/connectionsModel");

/* constants */
const { MESSAGES } = require("../../const/responses");
const { SETTINGS } = require("../../const/settings");

/**
  Endpoint: GET `/users`

  Descripción:
    Este endpoint permite obtener una lista de todos los usuarios 
    registrados en la aplicación.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.

	Parámetros de consulta:
    * page: página que se debe devolver.

  Respuestas:
    * 200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
      con la lista de todos los usuarios. El objeto usuario contiene 
      todos los campos de la tabla Usuarios excepto deleted_at, 
      password y token.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.get("/", authRoleMiddleware("admin"), async (req, res) => {
	const page = parseToInt(req.query.page, 1);

	try {
		const users = await Users.findAll({
			attributes: {
				exclude: ["deleted_at", "password", "token"],
			},
			limit: SETTINGS.PAGE_LIMIT,
			offset: (page - 1) * SETTINGS.PAGE_LIMIT,
		});

		const stats = await getTableStats(Users, page);

		return res.status(200).json({ stats, users });
	} catch {
		res.status(500).json();
	}
});

/**
  Endpoint: GET `/users/:id`
  
  Descripción:
    Este endpoint permite obtener información detallada de un usuario 
    específico por su ID.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.
  
  Parámetros de consulta:
    * id: El ID del usuario a buscar.

  Respuestas:
    * 200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
      con el usuario. El objeto usuario contiene todos los campos de la 
      tabla Usuarios excepto deleted_at, password y token.

    * 404 (Not Found): Si el usuario no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.get("/:id", authRoleMiddleware("admin"), async (req, res) => {
	try {
		const user = await Users.findByPk(req.params.id, {
			attributes: { 
				exclude: ["deleted_at", "password", "token"],
			},
		});

		if (user)
			return res.status(200).json(user);

		return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });  
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: PUT `/users/:id`

  Descripción:
    Este endpoint te permite actualizar la información de un usuario en 
    particular a través de su ID, excluyendo el token y el password.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.
  
  Parámetros de consulta:
    * id: El ID del usuario a actualizar.

  Respuestas:
    * 200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
      con el usuario. El objeto usuario contiene todos los campos de la 
      tabla Usuarios excepto deleted_at, password y token.

    * 404 (Not Found): Si el usuario no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.put("/:id", authRoleMiddleware("admin"), async (req, res) => {
	if (isEmptyObject(req.body))
		return res.status(400).json({ message: MESSAGES.QUERY_BODY_REQUIRED });

	try {
		const user = await Users.findByPk(req.params.id, {
			attributes: { 
				exclude: ["deleted_at", "password", "token"],
			},
		});

		if (!user)
			return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });

		// update user fields.
		Object.assign(user, req.body);
		await user.save();

		return res.json({ user });
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: DELETE `/users/:id`

  Descripción:
    Este endpoint permite eliminar un usuario específico por su ID.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.

  Parámetros de consulta:
    * id: El ID del usuario a eliminar.

  Respuestas:
    * 204 (Not Content): Si la autenticación es exitosa, no retorna ningún
      valor.

    * 404 (Not Found): Si el usuario no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.delete("/:id", authRoleMiddleware("admin"), async (req, res) => {
	try {
		const user = await Users.destroy({ 
			where: { id: req.params.id },
		});

		if (!user)
			return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    
		return res.status(204).json();
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: POST `/users/signup`

  Descripción:
    Este endpoint se utiliza para crear un usuario.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.

  Respuestas:
    * 201 (Created): Si la autenticación es exitosa, no retorna ningún
      valor.

    * 409 (Conflict): Si el usuario ya existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.post("/signup", authRoleMiddleware("admin"), async (req, res) => {
	const { email, password } = req.body;

	try {
		// check if the user already exists in the database.
		const existingUser = await Users.findOne({ where: { email }});
    
		if (existingUser)
			return res.status(409).json({ message: MESSAGES.USER_EXIST });

		// encrypt the user's password before storing it in the database.
		const hashedPassword = hashEncrypt(password);

		// create a new user.
		const newUser = new Users({ ...req.body, password: hashedPassword });
		await newUser.save();

		// create a new address and link to user.
		const newAddress = await Addresses.create({ ...req.body.address, user_id: newUser.id });
    
		// link user to address.
		await newUser.update({ address_id: newAddress.id });

		return res.status(201).json({ message: MESSAGES.USER_CREATED });
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: POST `/users/authentication`

  Descripción:
    Este endpoint se utiliza para autenticar un usuario mediante su 
    token y ID de usuario.

  Autenticación:
    Sin autenticación.

  Parámetros de consulta:
    * token (obligatorio): El token de autenticación del usuario.
    * user_id (obligatorio): El ID del usuario que se va a autenticar.

  Respuestas:
    * 200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
      con el usuario. El objeto usuario contiene todos los campos de la 
      tabla Usuarios excepto deleted_at, password y token.

    * 400 (Bad Request): Si el token o el user id no fueron enviados o
      están vacíos.

    * 401 (Bad Request): Si el usuario no está activo.

    * 404 (Not Found): Si el usuario no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.post("/authentication", async (req, res) => {
	const { token, user_id } = req.body;
  
	if (!token || !user_id)
		return res.status(400).json({ message: MESSAGES.AUTH_REQUIRED_FIELDS });

	try {
		//? search for the user in the database using the provided id.
		const user = await Users.findByPk(user_id, {
			attributes: { 
				exclude: ["deleted_at", "password"],
			},
		});

		if (!user)
			return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
		if (user.token !== token)
			return res.status(404).json({ message: MESSAGES.USER_UNAUTHORIZED });

		return res.status(200).json({ user: lodash.omit(user.dataValues, "token") });
	} catch {
		return res.status(500).json();
	}
});

/** 
  Endpoint: POST `/login`

  Descripción:
    Permite a un usuario autenticarse en el sistema y generar un token 
    para usar en futuras solicitudes.

  Autenticación:
    Sin autenticación.

  Parámetros de entrada:
    * email (obligatorio): String -> El email del usuario.
    * password (obligatorio): String -> La contraseña del usuario.

  Respuestas:
    * 200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
      con el usuario y el token generado. El objeto usuario contiene todos 
      los campos de la tabla Usuarios excepto deleted_at, password y
      token.

    * 400 (Bad Request): Si el email o la contraseña no fueron enviados o
      están vacíos.

    * 401 (Unauthorized): Si el email no existe, la contraseña es incorrecta o 
      el usuario no está activo.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res.status(400).json({ message: MESSAGES.LOGIN_REQUIRED_FIELDS });
  
	try {
		const user = await Users.findOne({ 
			attributes: { 
				exclude: ["deleted_at"],
			},
			where: { email },
		});
  
		if (!user)
			return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
  
		// check if the password is valid.
		if (!compareEncrypt(password, user.password)) {
			return res.status(401).json({ message: MESSAGES.LOGIN_ERROR });
		}
    
		// generate and save a token.
		user.token = jwt.sign({ user_id: user.id }, process.env.JWT_KEY);
		await user.save();
    
		res.status(200).json({ user: lodash.omit(user.dataValues, "password") });
	} catch {
		res.status(500).json();
	}
});

/** 
  Endpoint: POST `/logout`

  Descripción:
    Permite a un usuario eliminar el token de sesión asociado a ese usuario. 

  Autenticación:
    Sin autenticación.

  Parámetros de entrada:
    * id: El ID del usuario a desloguear.

  Respuestas:
    * 200 (OK): Si la autenticación es exitosa, no retorna ningún
      valor.

    * 404 (Not Found): Si el usuario no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.post("/logout", async (req, res) => {
	try {
		const user = await Users.findByPk(req.body.user_id);

		if (!user)
			return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });

		// delete token of user id.
		await user.update({ token: null });

		return res.status(200).json({ message: MESSAGES.USER_LOGOUT });
	} catch {
		return res.status(500).json();
	}
});

module.exports = router;