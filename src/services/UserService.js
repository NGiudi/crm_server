import { UserModel } from "../models/UserModel.js";
import { SETTINGS } from "../const/settings.js";
import { Utils } from "../utils/index.js";
import { Message } from "../const/mails/index.js";

export class UserService {
  
  constructor() {
    this.model = new UserModel();
  }

  create = async (body) => {
    const hashedPassword = Utils.encrypt.hashEncrypt(body.password);
    const user = await this.model.create({ ...body, password: hashedPassword });
    await Utils.nodemailer.sendEmail(Message.activeMsg(body));
    return user;
  }

  delete = async (id) => {
    const count = await this.model.delete(id);
    return count;
  }

  generateToken = async (user) => {
    const now = new Date();

    const tokenObj = {
      user_id: user.id,
      expired_at: now.setDate(now.getDate() + SETTINGS.TOKEN_EXPIRED_IN_DAYS),
    };

    user.token = Utils.tokens.createToken(tokenObj);
		const newUser = this.model.update(user.id, { token: user.token });
    return newUser;
  }

  getOne = async (filter) => {
    const user = await this.model.getOne(filter);
    return user;
  }

  getPage = async (page) => {
    const users = await this.model.getPage(page);
    return users;
  }

  update = async (id, modifiedUser) => {
    const count = await this.model.update(id, modifiedUser);
    if(modifiedUser.email && !modifiedUser.active){
      await Utils.nodemailer.sendEmail(Message.inactiveMsg(modifiedUser));
    }
    return count;
  }
}