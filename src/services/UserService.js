/* models */
import { UserModel } from "../models/UserModel.js";

/* utils */
import { hashEncrypt } from "../utils/encypt.js";

export class UserService {
  
  constructor() {
    this.model = new UserModel();
  }

  create = async (body) => {
    const hashedPassword = hashEncrypt(body.password);
    const user = await this.model.create({ ...body, password: hashedPassword });
    return user;
  }

  delete = async (id) => {
    const count = await this.model.delete(id);
    return count;
  }

  getOne = async (id) => {
    const user = await this.model.getOne(id);
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