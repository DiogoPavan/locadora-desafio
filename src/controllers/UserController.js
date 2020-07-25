import status from 'http-status';

import UserService from '../services/UserService';

class UserController {
  async insert(req, res) {
    const { nome, email, password } = req.body;

    const user = await UserService.insert({ nome, email, password });

    return res.status(status.CREATED).send({
      message: 'Usuário cadastrado com sucesso',
      data: user,
    });
  }
}

export default new UserController();
