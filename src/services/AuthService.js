import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../config/authConfig';
import ApiError from '../utils/ApiError';

class AuthService {
  constructor(container) {
    this.userModel = container.get('UserModel');
  }

  async login({ email, password }) {
    const user = await this.userModel.findByEmail(email);

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

    await this.userModel.updateById(idUser, { token });

    return {
      idUser,
      nome,
      token,
    };
  }

  async logoff(idUser) {
    await this.userModel.updateById(idUser, { token: null });
  }
}

export default AuthService;
