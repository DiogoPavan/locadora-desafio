import status from 'http-status';

import UserService from '../services/UserService';

class UserController {
  constructor(container) {
    this.userService = container.get(UserService);
  }

  async insert(req, res) {
    const { nome, email, password } = req.body;

    const user = await this.userService.insert({ nome, email, password });

    return res.status(status.CREATED).send({
      message: 'Usuário cadastrado com sucesso',
      data: user,
    });
  }
}

export default UserController;
