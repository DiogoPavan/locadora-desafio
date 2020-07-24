import knex from '../database/connection';

import FilmeModel from '../models/FilmeModel';
import LocacaoService from '../services/LocacaoService';

class FilmeService {
  async buscarFilmes({ titulo, disponivel }) {
    return FilmeModel.findAll({ titulo, disponivel });
  }

  async alugar({ idUser, idFilme }) {
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

      return FilmeModel.findById(idFilme);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async devolver({ idUser, idFilme }) {
    await LocacaoService.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default new FilmeService();
