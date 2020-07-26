import knex from '../database/connection';

class LocacaoModel {
  async insert(data, trx) {
    const [idLocacao] = await knex('locacao').insert(data).transacting(trx);
    return idLocacao;
  }

  async findByIdFilmeAndIdUser({ idUser, idFilme }) {
    return knex('locacao').select('*').where({ idUser, idFilme }).first();
  }

  async deleteByIdFilmeAndIdUser({ idUser, idFilme }) {
    await knex('locacao').delete().where({ idUser, idFilme });
  }
}

export default new LocacaoModel();
