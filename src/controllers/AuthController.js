import knex from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    const { idUser, nome, password: userPassword } = await knex('user')
      .where({ email })
      .select('idUser', 'nome', 'password')
      .first();

    if (!idUser) {
      throw new Error('Usuário não existe na base');
    }

    if (!(await bcrypt.compare(password, userPassword))) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ idUser, email, nome }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    await knex('user').where({ idUser }).update({ token });

    return res.status(200).send({
      message: 'Login realizado com sucesso',
      status: 'OK',
      data: {
        idUser,
        nome,
        token,
      },
    });
  }

  async logoff(req, res) {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');
    const { idUser } = jwt.decode(token);

    await knex('user').where({ idUser }).update({ token: null });

    return res.send({ message: 'Logoff realizado com sucesso', status: 'OK' });
  }
}

export default new AuthController();
