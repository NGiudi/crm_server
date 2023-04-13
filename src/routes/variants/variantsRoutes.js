const router = require("express").Router();

/* middlewares */
const { authLoggedInUser } = require("../middlewares/auth");

/* utils */
const { getTableStats } = require("../utils/tables");

/* models */
const { Variants } = require("../models/connectionsModel");

/* constants */
const { MESSAGES } = require("../const/responses");
const { SETTINGS } = require("../const/settings");

/**
  Endpoint: GET `/variants`

  Descripción:
    Este endpoint permite obtener una lista de todos los variantes 
    registrados en la aplicación.
  
	Parámetros de consulta:
    * page: página que se debe devolver.
		* product_id: para devolver las variantes de un producto en específico.

  Respuestas:
    * 200 (OK): retorna un objeto JSON con la lista de una página de 
      variantes. El objeto variante contiene todos los campos de la 
      tabla Productos excepto deleted_at.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.get("/", authLoggedInUser(), async (req, res) => {
	const { page, product_id } = req.body;
	const _page = page || 1;

	try {
		const variants = await Variants.findAll({
			attributes: {
				exclude: ["deleted_at"],
			},
			limit: SETTINGS.PAGE_LIMIT,
			offset: (_page - 1) * SETTINGS.PAGE_LIMIT,
			where: { product_id },
		});

		const statsOptions = { 
			where: { product_id },
		};

		const stats = await getTableStats(Variants, _page, statsOptions);

		return res.status(200).json({ variants, stats });
	} catch {
		res.status(500).json();
	}
});

/**
  Endpoint: GET `/variants/:id`
  
  Descripción:
    Este endpoint permite obtener información detallada de un variante 
    específico por su ID.
  
  Parámetros de consulta:
    * id: El ID del variante a buscar.

  Respuestas:
    * 200 (OK): Retorna un objeto JSON con el variante. El objeto variante 
      contiene todos los campos de la tabla Producto excepto deleted_at.

    * 404 (Not Found): Si el variante no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.get("/:id", authLoggedInUser(), async (req, res) => {
	try {
		const variant = await Variants.findByPk(req.params.id, {
			attributes: { 
				exclude: ["deleted_at"],
			},
		});

		if (variant)
			return res.status(200).json(variant);

		return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });  		
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: PUT `/variants/:id`

  Descripción:
    Este endpoint te permite actualizar la información de un variante en 
    particular a través de su ID.

  Parámetros de consulta:
    * id: El ID del variante a actualizar.

  Respuestas:
    * 200 (OK): Retorna un objeto JSON con el variante. El objeto variante
      contiene todos los campos de la tabla Productos excepto deleted_at.

    * 404 (Not Found): Si el variante no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.put("/:id", authLoggedInUser(), async (req, res) => {
	try {
		const variant = await Variants.findByPk(req.params.id, {
			attributes: { 
				exclude: ["deleted_at"],
			},
		});

		if (!variant)
			return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });

		// update variant fields.
		Object.assign(variant, req.body);
		await variant.save();

		return res.json({ variant });
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: DELETE `/users/:id`

  Descripción:
    Este endpoint permite eliminar un variante específico por su ID.

  Parámetros de consulta:
    * id: El ID del variante a eliminar.

  Respuestas:
    * 204 (Not Content): Si la autenticación es exitosa, no retorna ningún
      valor.

    * 404 (Not Found): Si el variante no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.delete("/:id", authLoggedInUser(),  async (req, res) => {
	try {
		const variant = await Variants.destroy({
			where: { id: req.params.id },
		});

		if (!variant)
			return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    
		return res.status(204).json();
	} catch {
		return res.status(500).json();
	}
});

module.exports = router;