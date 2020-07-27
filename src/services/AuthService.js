import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../config/authConfig';
import ApiError from '../utils/ApiError';

import UserService from '../services/UserService';

class AuthService {
  constructor(container) {
    this.userService = container.get(UserService);
  }

  async login(email, password) {
    const user = await this.userService.findByEmail(email);

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

    await this.userService.updateById(idUser, { token });

    return {
      idUser,
      nome,
      token,
    };
  }

  async logoff(idUser) {
    await this.userService.updateById(idUser, { token: null });
  }
}

export default AuthService;
