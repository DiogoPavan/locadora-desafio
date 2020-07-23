class UserController {
  async create(req, res) {
    return res.json({ message: 'usuário criado' });
  }
}

export default new UserController();
