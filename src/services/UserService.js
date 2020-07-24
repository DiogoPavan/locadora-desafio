import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';

class UserService {
  async insert({ nome, email, password }) {
    const userExists = await UserModel.findByEmail(email);

    if (userExists) {
      throw new Error('Email já usado por outro Usuário');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const idUser = await UserModel.insert({
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
}

export default new UserService();