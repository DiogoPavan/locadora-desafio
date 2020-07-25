import status from 'http-status';

import AuthService from '../services/AuthService';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await AuthService.login({ email, password });

    return res.status(status.OK).send({
      message: 'Login realizado com sucesso',
      data: user,
    });
  }

  async logoff(req, res) {
    const idUser = req.idUserLogado;

    await AuthService.logoff(idUser);

    return res.status(status.OK).send({ message: 'Logoff realizado com sucesso' });
  }
}

export default new AuthController();
