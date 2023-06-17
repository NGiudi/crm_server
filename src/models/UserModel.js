import { Users } from "./database/tablesConnection.js";
import { SETTINGS } from "../const/settings.js";

export class UserModel {
  
  constructor() {
    
  }

  create = async (body) => {
    const user = await Users.create(body);
    return user;
  }

  delete = async (id) => {
    const count = await Users.destroy({ 
      where: { id },
    });

    return count;
  }

  getOne = async (filter) => {
    const baseQuery = {
      attributes: { 
        exclude: ["deleted_at"],
      },
    };

    if (filter) {
      baseQuery.where = filter;
    }

    const user = await Users.findOne(baseQuery);

    return user;
  }

  getPage = async (page) => {
    const users = await Users.findAll({
      attributes: {
        exclude: ["deleted_at", "password", "token"],
      },
      limit: SETTINGS.PAGE_LIMIT,
      offset: (page - 1) * SETTINGS.PAGE_LIMIT,
      order: [['created_at', 'DESC']],
    });

    return users;
  }

  update = async (id, modifiedUser) => {
    const count = await Users.update(modifiedUser, {
			where: { id },
		});

		return count;
  }
}