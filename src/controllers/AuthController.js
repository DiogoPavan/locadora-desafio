import AuthService from '../services/AuthService';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await AuthService.login({ email, password });

    return res.status(200).send({
      message: 'Login realizado com sucesso',
      status: 'OK',
      data: user,
    });
  }

  async logoff(req, res) {
    const idUser = req.idUserLogado;

    await AuthService.logoff(idUser);

    return res.send({ message: 'Logoff realizado com sucesso', status: 'OK' });
  }
}

export default new AuthController();
