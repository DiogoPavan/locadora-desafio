import ApiError from '../utils/ApiError';

import LocacaoModel from '../models/LocacaoModel';

class LocacaoService {
  constructor(container) {
    this.locacaoModel = container.get(LocacaoModel);
  }

  async insert(data, trx) {
    const { idUser, idFilme } = data;
    const locacao = await this.locacaoModel.findByIdFilmeAndIdUser({ idUser, idFilme }, trx);

    if (locacao) {
      throw new ApiError('Filme já alocado por você');
    }

    return this.locacaoModel.insert(data, trx);
  }

  async deleteByIdFilmeAndIdUser(idFilme, idUser) {
    await this.locacaoModel.deleteByIdFilmeAndIdUser(idFilme, idUser);
  }
}

export default LocacaoService;
