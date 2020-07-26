import LocacaoModel from '../models/LocacaoModel';
import ApiError from '../utils/ApiError';

class LocacaoService {
  async insert(data, trx) {
    const { idUser, idFilme } = data;
    const locacao = await LocacaoModel.findByIdFilmeAndIdUser({ idUser, idFilme }, trx);

    if (locacao) {
      throw new ApiError('Filme já alocado por você');
    }

    return LocacaoModel.insert(data, trx);
  }

  async deleteByIdFilmeAndIdUser({ idUser, idFilme }) {
    await LocacaoModel.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default new LocacaoService();
