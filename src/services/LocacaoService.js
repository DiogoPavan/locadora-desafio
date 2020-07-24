import LocacaoModel from '../models/LocacaoModel';

class LocacaoService {
  async insert(data, trx) {
    return LocacaoModel.insert(data, trx);
  }

  async deleteByIdFilmeAndIdUser({ idUser, idFilme }) {
    await LocacaoModel.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default new LocacaoService();
