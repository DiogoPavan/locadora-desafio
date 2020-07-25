import knex from '../database/connection';

import FilmeModel from '../models/FilmeModel';
import LocacaoService from '../services/LocacaoService';

class FilmeService {
  async buscarFilmes({ titulo, disponivel }) {
    return FilmeModel.findAll({ titulo, disponivel });
  }

  async alugar({ idUser, idFilme }) {
    const filme = await FilmeModel.findById(idFilme);

    if (!filme) {
      throw new Error('Filme não existe na base de dados');
    }

    try {
      await knex.transaction(async (trx) => {
        const { copias, alocados } = await FilmeModel.findQuantidadeCopiasAndAlocadosById(
          { idFilme },
          trx
        );

        if (copias <= alocados) {
          throw new Error('Filme não está mais disponível');
        }

        await LocacaoService.insert({ idUser, idFilme }, trx);
      });

      return filme;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async devolver({ idUser, idFilme }) {
    await LocacaoService.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default new FilmeService();
