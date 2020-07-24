import knex from '../database/connection';

class UserModel {
  async insert(data) {
    const [idUser] = await knex('user').insert(data);
    return idUser;
  }

  async findByEmail(email) {
    return knex('user').select('*').where({ email }).first();
  }

  async updateById(idUser, data) {
    return knex('user').update(data).where({ idUser });
  }
}

export default new UserModel();
