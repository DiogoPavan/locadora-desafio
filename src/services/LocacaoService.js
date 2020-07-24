import LocacaoModel from '../models/LocacaoModel';

class LocacaoService {
  async insert(data) {
    return LocacaoModel.insert(data);
  }

  async deleteByIdFilmeAndIdUser({ idUser, idFilme }) {
    await LocacaoModel.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default new LocacaoService();
