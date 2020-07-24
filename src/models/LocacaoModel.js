import knex from '../database/connection';

class LocacaoModel {
  async insert(data) {
    const [idLocacao] = await knex('locacao').insert(data);
    return idLocacao;
  }

  async deleteByIdFilmeAndIdUser({ idUser, idFilme }) {
    await knex('locacao').delete().where({ idUser, idFilme });
  }
}

export default new LocacaoModel();
