import knex from '../database/connection';

class FilmeModel {
  async findById(idFilme) {
    return knex('filme').select('*').where({ idFilme });
  }

  async findQuantidadeCopiasAndAlocadosById({ idFilme }, trx) {
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

  async findAll({ titulo, disponivel }) {
    const sqlFindAll = this.buildSqlFindAll({ titulo, disponivel });

    const filmes = await knex.raw(sqlFindAll);

    return filmes[0];
  }

  buildSqlFindAll({ titulo, disponivel }) {
    let tituloQuery = '';
    let disponivelQuery = '';

    if (titulo) {
      tituloQuery = `WHERE f.titulo LIKE '%${titulo}%'`;
    }

    if (typeof disponivel !== 'undefined') {
      disponivelQuery =
        disponivel == 'true' ? 'HAVING alocados < copias' : ' HAVING alocados = f.copias';
    }

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
}

export default new FilmeModel();
