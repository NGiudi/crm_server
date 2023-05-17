const jwt = require("jsonwebtoken");
const lodash = require("lodash");

/* utils */
const { compareEncrypt, hashEncrypt } = require("../utils/encypt");
const { isEmptyObject } = require("../utils/objects");
const { getTableStats } = require("../utils/tables");
const { parseToInt } = require("../utils/numbers");

/* models */
const { Users } = require("../models/connectionsModel");

/* constants */
const { MESSAGES } = require("../const/responses");
const { SETTINGS } = require("../const/settings");

//TODO: crear UserServices
class UserController {
  constructor() {

  }

  getPage = async (req, res) => {
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
  }

  getOne = async (req, res) => {
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
  }

  update = async (req, res) => {
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
  }

  delete = async (req, res) => {
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
  }

  signup = async (req, res) => {
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
  
      return res.status(201).json({ message: MESSAGES.USER_CREATED });
    } catch {
      return res.status(500).json();
    }
  }

  authentication = async (req, res) => {
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
        return res.status(401).json({ message: MESSAGES.USER_UNAUTHORIZED });
  
      return res.status(200).json({ user: lodash.omit(user.dataValues, "token") });
    } catch {
      return res.status(500).json();
    }
  }

  login = async (req, res) => {
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
  }

  logout = async (req, res) => {
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
  }
}

module.exports  = UserController;