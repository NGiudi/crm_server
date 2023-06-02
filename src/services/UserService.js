import { UserModel } from "../models/UserModel.js";
import { Utils } from "../utils/index.js";

export class UserService {
  
  constructor() {
    this.model = new UserModel();
  }

  create = async (body) => {
    const hashedPassword = Utils.tokens.hashEncrypt(body.password);
    const user = await this.model.create({ ...body, password: hashedPassword });
    return user;
  }

  delete = async (id) => {
    const count = await this.model.delete(id);
    return count;
  }

  generateToken = async (user) => {
    user.token = Utils.tokens.createToken({ user_id: user.id });
		const newUser = this.model.update(user.id, { token: user.token });
    return newUser;
  }

  getOne = async (id, filter) => {
    const user = await this.model.getOne(id, filter);
    return user;
  }

  getOneByParam = async (param) => {
    const user = await this.model.getOneByParam(param);
    return user;
  }

  getPage = async (page) => {
    const users = await this.model.getPage(page);
    return users;
  }

  update = async (id, modifiedUser) => {
    const count = await this.model.update(id, modifiedUser);
    return count;
  }
}