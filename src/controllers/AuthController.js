import status from 'http-status';

class AuthController {
  constructor(container) {
    this.authService = container.get('AuthService');
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await this.authService.login({ email, password });

    return res.status(status.OK).send({
      message: 'Login realizado com sucesso',
      data: user,
    });
  }

  async logoff(req, res) {
    const idUser = req.idUserLogado;
    await this.authService.logoff(idUser);

    return res.status(status.OK).send({ message: 'Logoff realizado com sucesso' });
  }
}

export default AuthController;
