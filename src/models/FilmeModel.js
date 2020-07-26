import knex from '../database/connection';

class FilmeModel {
  async findById(idFilme) {
    return knex('filme').select('*').where({ idFilme }).first();
  }

  async findAll({ titulo, disponivel }) {
    const sqlFindAll = this.#buildSqlFindAll({ titulo, disponivel });

    const filmes = await knex.raw(sqlFindAll);

    return filmes[0];
  }

  async findQuantidadeCopiasAndAlocadosById(idFilme, trx) {
    return knex('filme as f')
      .select('f.idFilme', 'copias')
      .count('l.idLocacao', { as: 'alocados' })
      .leftJoin('locacao as l', 'f.idFilme', 'l.idFilme')
      .where({ 'f.idFilme': idFilme })
      .groupBy('f.idFilme')
      .first()
      .transacting(trx)
      .forUpdate();
  }

  #buildSqlFindAll({ titulo, disponivel }) {
    const tituloQuery = this.#getTituloSql(titulo);
    const disponivelQuery = this.#getDisponivelSql(disponivel);

    return `
      SELECT
        f.idFilme,
        f.titulo,
        f.diretor,
        f.copias,
        COUNT(l.idLocacao) AS alocados
      FROM
        filme f
      LEFT JOIN
        locacao l on f.idFilme = l.idFilme
      ${tituloQuery}
      GROUP BY
        f.idFilme
      ${disponivelQuery}
    `;
  }

  #getTituloSql(titulo) {
    let tituloQuery = '';

    if (titulo) {
      tituloQuery = `WHERE f.titulo LIKE '%${titulo}%'`;
    }

    return tituloQuery;
  }

  #getDisponivelSql(disponivel) {
    let disponivelQuery = '';

    if (disponivel == 'true') {
      disponivelQuery = 'HAVING alocados < copias';
    }

    if (disponivel == 'false') {
      disponivelQuery = 'HAVING alocados = f.copias';
    }

    return disponivelQuery;
  }
}

export default new FilmeModel();
