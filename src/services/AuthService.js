import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

import UserModel from '../models/UserModel';

class AuthService {
  async login({ email, password }) {
    const { idUser, nome, password: userPassword } = await UserModel.findByEmail(email);

    if (!idUser) {
      throw new Error('Usuário não existe na base');
    }

    if (!(await bcrypt.compare(password, userPassword))) {
      throw new Error('Senha incorreta');
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
