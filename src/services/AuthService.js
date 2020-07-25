import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import UserModel from '../models/UserModel';
import ApiError from '../utils/ApiError';

class AuthService {
  async login({ email, password }) {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new ApiError('Usuário não existe na base');
    }

    const { idUser, nome, password: userPassword } = user;

    if (!(await bcrypt.compare(password, userPassword))) {
      throw new ApiError('Senha incorreta');
    }

    const token = jwt.sign({ idUser, email, nome }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    await UserModel.updateById(idUser, { token });

    return {
      idUser,
      nome,
      token,
    };
  }

  async logoff(idUser) {
    await UserModel.updateById(idUser, { token: null });
  }
}

export default new AuthService();
