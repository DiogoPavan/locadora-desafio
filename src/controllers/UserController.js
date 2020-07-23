import knex from '../database/connection';
import bcrypt from 'bcrypt';

class UserController {
  async create(req, res) {
    const { nome, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    //validar email antes de inserir
    const [idUser] = await knex('user').insert({
      nome,
      email,
      password: hashPassword,
    });

    return res.json({
      message: 'Usuário cadastrado com sucesso',
      status: 'OK',
      data: {
        idUser,
        nome,
        email,
      },
    });
  }
}

export default new UserController();
