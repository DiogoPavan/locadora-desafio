import knex from '../database/connection';

import ApiError from '../utils/ApiError';
import FilmeModel from '../models/FilmeModel';
import LocacaoService from '../services/LocacaoService';

class FilmeService {
  constructor(container) {
    this.filmeModel = container.get(FilmeModel);
    this.locacaoService = container.get(LocacaoService);
  }

  async findAll({ titulo, disponivel }) {
    return this.filmeModel.findAll({ titulo, disponivel });
  }

  async alugar(idFilme, idUser) {
    try {
      const filme = await this.filmeModel.findById(idFilme);

      if (!filme) {
        throw new ApiError('Filme não existe na base de dados');
      }

      await knex.transaction(async (trx) => {
        const { copias, alocados } = await this.filmeModel.findQuantidadeCopiasAndAlocadosById(
          idFilme,
          trx
        );

        if (copias <= alocados) {
          throw new ApiError('Filme não está mais disponível');
        }

        await this.locacaoService.insert({ idUser, idFilme }, trx);
      });

      return filme;
    } catch (error) {
      throw new ApiError(error.message, error.statusCode);
    }
  }

  async devolver(idFilme, idUser) {
    await this.locacaoService.deleteByIdFilmeAndIdUser(idFilme, idUser);
  }
}

export default FilmeService;
