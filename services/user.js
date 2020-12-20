const bcrypt = require('bcrypt');
const saltRounds = 10;


class UserService {
  constructor({UserModel}) {
    this.UserModel = UserModel;
  }

  async registerUser({name, email, password, role}) {
    //access dataValues
    const existUsers = await this.UserModel.findAll({
      where: {
        email
      }
    });
    if (existUsers.length > 0) {
      return {
        message: '帳號已註冊'
      }
    }

    const passwordHashed = bcrypt.hashSync(password, saltRounds);

    return this.UserModel.create({
      name,
      email,
      password: passwordHashed,
      role,
    });

  }

  async login({email, password}) {
    const result = {
      message: '',
    };
    const users = await this.UserModel.findAll({
      where: {
        email
      }
    });
    if (users.length === 0) {
      result.message = '帳號未註冊';
      return result;
    }

    const user = users[0].dataValues;
    const {password: dbPassword} = user;
    const isPasswordMatch = bcrypt.compareSync(password, dbPassword);
    if (!isPasswordMatch) {
      result.message = '密碼錯誤';
      return result;
    }

    return user;
  }

  async getUserDetails({userId}) {
    const result = {
      message: '',
    };
    const users = await this.UserModel.findAll({
      where: {
        userId
      }
    });
    if (users.length === 0) {
      result.message = '用戶不存在';
      return result;
    }

    const user = users[0].dataValues;
    return user;
  }

  async getUsersByRole({role, limit, offset}) {
    const users = await this.UserModel.queryByRole({role, limit, offset});
    return users;

  }

  async updateUserScore({userId, score, updaterUserId}) {
    return this.UserModel.update({
      score,
      reviewer: updaterUserId,
    }, {
      where: {
        userId
      }
    });
  }
}

module.exports = UserService;