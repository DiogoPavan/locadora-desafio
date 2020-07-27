import bcrypt from 'bcrypt';

import ApiError from '../utils/ApiError';
import UserModel from '../models/UserModel';

class UserService {
  constructor(container) {
    this.userModel = container.get(UserModel);
  }

  async insert({ nome, email, password }) {
    const userExists = await this.userModel.findByEmail(email);

    if (userExists) {
      throw new ApiError('Email já usado por outro Usuário');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const idUser = await this.userModel.insert({
      nome,
      email,
      password: hashPassword,
    });

    return {
      idUser,
      nome,
      email,
    };
  }

  async updateById(idUser, data) {
    return this.userModel.updateById(idUser, data);
  }

  async findByEmail(email) {
    return this.userModel.findByEmail(email);
  }

  async findByToken(token) {
    return this.userModel.findByToken(token);
  }
}

export default UserService;
