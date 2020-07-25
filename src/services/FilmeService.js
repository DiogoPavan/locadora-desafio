import knex from '../database/connection';

import ApiError from '../utils/ApiError';
import FilmeModel from '../models/FilmeModel';
import LocacaoService from '../services/LocacaoService';

class FilmeService {
  async findAll({ titulo, disponivel }) {
    return FilmeModel.findAll({ titulo, disponivel });
  }

  async alugar({ idUser, idFilme }) {
    try {
      const filme = await FilmeModel.findById(idFilme);

      if (!filme) {
        throw new ApiError('Filme não existe na base de dados');
      }

      await knex.transaction(async (trx) => {
        const { copias, alocados } = await FilmeModel.findQuantidadeCopiasAndAlocadosById(
          { idFilme },
          trx
        );

        if (copias <= alocados) {
          throw new ApiError('Filme não está mais disponível');
        }

        await LocacaoService.insert({ idUser, idFilme }, trx);
      });

      return filme;
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }

  async devolver({ idUser, idFilme }) {
    await LocacaoService.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default new FilmeService();
