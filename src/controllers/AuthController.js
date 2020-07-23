class AuthController {
  async login(req, res) {
    return res.json({ message: 'logado' });
  }

  async logoff(req, res) {
    return res.json({ message: 'deslogado' });
  }
}

export default new AuthController();
