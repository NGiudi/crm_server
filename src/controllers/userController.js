import lodash from "lodash";

/* utils */
import { compareEncrypt } from "../utils/encypt.js";
import { isEmptyObject } from "../utils/objects.js";
import { getTableStats } from "../utils/tables.js";
import { parseToInt } from "../utils/numbers.js";

/* models */
import { Users } from "../models/database/tablesConnection.js";

/* service */
import { UserService } from "../services/UserService.js";

/* constants */
import { MESSAGES } from "../const/responses.js";

export class UserController {
	constructor() {
		this.services = new UserService();
	}

	authentication = async (req, res) => {
		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.QUERY_BODY_REQUIRED });
  
		try {
			const user = await this.services.getOne({ id: req.body.user_id });
			  
			if (!user)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
			
			if (user.token !== req.body.token)
				return res.status(401).json({ message: MESSAGES.USER_UNAUTHORIZED });
  
			return res.status(200).json({ user });
		} catch {
			return res.status(500).json();
		}
	};

	create = async (req, res) => {
		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.PRODUCT_REQUIRED_FIELDS });

		try {
			const existingUser = await this.services.getOneByParam({ email: req.body.email });
      
			if (existingUser)
				return res.status(409).json({ message: MESSAGES.USER_EXIST });
			
			const user = await this.services.create(req.body);
			  
			return res.status(201).json(user);
		} catch {
			return res.status(500).json();
		}
	};

	delete = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		try {
			const count = await this.services.delete(id);
  
			if (count[0] === 0)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
      
			return res.status(204).json();
		} catch {
			return res.status(500).json();
		}
	};

	getOne = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		try {
			const user = await this.services.getOne({ id });
  
			if (!user)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });  
			
			return res.status(200).json(user);
		} catch {
			return res.status(500).json();
		}
	};

	getPage = async (req, res) => {
		const page = parseToInt(req.query.page, 1);
  
		try {
			const users = await this.services.getPage(page);  
			const stats = await getTableStats(Users, page);
  
			return res.status(200).json({ stats, users });
		} catch {
			res.status(500).json();
		}
	};

	login = async (req, res) => {		
		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.PRODUCT_REQUIRED_FIELDS });

		try {
			const user = await this.services.getOne({ email: req.body.email });
    
			if (!user)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    
			// check if the password is valid.
			if (!compareEncrypt(req.body.password, user.password))
				return res.status(401).json({ message: MESSAGES.LOGIN_ERROR });
      
			this.services.generateToken(user);
      
			res.status(200).json({ user: lodash.omit(user.dataValues, "password") });
		} catch {
			res.status(500).json();
		}
	};

	logout = async (req, res) => {
		try {
			const count = await this.services.update(req.body.user_id, { token: null });
  
			if (count[0] === 0)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });

		 	return res.status(200).json({ message: MESSAGES.USER_LOGOUT });
		} catch {
			return res.status(500).json();
		}
	};

	update = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.QUERY_BODY_REQUIRED });

		try {
			const count = this.services.update(id, req.body);
  
			if (count[0] === 0)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
  
			return res.status(200).json();
		} catch {
			return res.status(500).json();
		}
	};
}