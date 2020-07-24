import knex from '../database/connection';

class FilmeModel {
  async selectById(idFilme) {
    return knex('filme').select('*').where({ idFilme });
  }

  async findAll({ titulo, disponivel }) {
    const sqlFindAll = this.buildSqlFindAll({ titulo, disponivel });

    const filmes = await knex.raw(sqlFindAll);

    return filmes[0];
  }

  buildSqlFindAll() {
    let tituloQuery = '';
    let disponivelQuery = '';

    if (titulo) {
      tituloQuery = `WHERE f.titulo LIKE '%${titulo}%'`;
    }

    if (typeof disponivel !== 'undefined') {
      disponivelQuery =
        disponivel == 'true' ? 'HAVING locados < copias' : ' HAVING locados = f.copias';
    }

    return `
      SELECT
        f.idFilme,
        f.titulo,
        f.diretor,
        f.copias,
        COUNT(l.idLocacao) AS locados
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
