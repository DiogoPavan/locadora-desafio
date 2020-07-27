import ApiError from '../utils/ApiError';

class LocacaoService {
  constructor(container) {
    this.locacaoModel = container.get('LocacaoModel');
  }

  async insert(data, trx) {
    const { idUser, idFilme } = data;
    const locacao = await this.locacaoModel.findByIdFilmeAndIdUser({ idUser, idFilme }, trx);

    if (locacao) {
      throw new ApiError('Filme já alocado por você');
    }

    return this.locacaoModel.insert(data, trx);
  }

  async deleteByIdFilmeAndIdUser({ idUser, idFilme }) {
    await this.locacaoModel.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default LocacaoService;
