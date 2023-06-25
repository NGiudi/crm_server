import lodash from "lodash";

import { Users } from "../models/database/tablesConnection.js";
import { UserService } from "../services/UserService.js";
import { MESSAGES } from "../const/responses.js";
import { Utils } from "../utils/index.js";
import { validateLogin, validateAuthentication, validateSignup, validateUpdate, validateId, validatePage } from "../validations/userValidation.js"

export class UserController {
	constructor() {
		this.services = new UserService();
	}

	authentication = async (req, res) => {
		const validation = validateAuthentication(req.body)
		if (!validation.result)
		return res.status(400).json({ message: validation });
  
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
		const validation = validateSignup(req.body)
		if (!validation.result)
		return res.status(400).json({ message: validation });

		try {
			const existingUser = await this.services.getOne({ email: req.body.email });
      
			if (existingUser)
				return res.status(409).json({ message: MESSAGES.USER_EXIST });
			
			const user = await this.services.create(req.body);
			  
			return res.status(201).json(user);
		} catch {
			return res.status(500).json();
		}
	};

	delete = async (req, res) => {
		const id = Number(req.params.id);
		const validationId = validateId({id});
		if (!validationId.result)
			return res.status(400).json({ message: validationId });

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
		const id = Number(req.params.id);
		const validationId = validateId({id});
		if (!validationId.result)
			return res.status(400).json({ message: validationId });

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
		const page = Number(req.query.page) || 1;
		const validationPage = validatePage({page});
		if (!validationPage.result)
			return res.status(400).json({ message: validationPage });
  
		try {
			const users = await this.services.getPage(page);  
			const stats = await Utils.tables.getTableStats(Users, page);
  
			return res.status(200).json({ stats, users });
		} catch {
			res.status(500).json();
		}
	};

	login = async (req, res) => {
		const validation = validateLogin(req.body);	
		if (!validation.result)
			return res.status(400).json({ message: validation });

		try {
			const user = await this.services.getOne({ email: req.body.email });
    
			if (!user || !user.active)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    
			if (!Utils.encrypt.compareEncrypt(req.body.password, user.password))
				return res.status(401).json({ message: MESSAGES.LOGIN_ERROR });
      
			this.services.generateToken(user);
      
			res.status(200).json({ user: lodash.omit(user.dataValues, "password") });
		} catch {
			res.status(500).json();
		}
	};

	logout = async (req, res) => {
		const id = Number(req.body.user_id)
		const validation = validateId({id});	
		if (!validation.result)
			return res.status(400).json({ message: validation });

		try {
			const count = await this.services.update(req.body.user_id, { token: null });
  
			if (count[0] === 0)
				return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });

		 	return res.status(200).json({ message: MESSAGES.USER_LOGOUT });
		} catch(err) {
			console.log(err)
			return res.status(500).json();
		}
	};

	update = async (req, res) => {
		const { id } = req.params;

		const validation = validateUpdate(req.body)
		if (!validation.result)
		return res.status(400).json({ message: validation });

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		if (Utils.objects.isEmptyObject(req.body))
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