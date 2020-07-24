import UserService from '../services/UserService';

class UserController {
  async insert(req, res) {
    const { nome, email, password } = req.body;

    const user = await UserService.insert({ nome, email, password });

    return res.json({
      message: 'Usuário cadastrado com sucesso',
      status: 'OK',
      data: user,
    });
  }
}

export default new UserController();
