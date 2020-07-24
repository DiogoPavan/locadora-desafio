import FilmeModel from '../models/FilmeModel';
import LocacaoService from '../services/LocacaoService';

class FilmeService {
  async buscarFilmes({ titulo, disponivel }) {
    return FilmeModel.findAll({ titulo, disponivel });
  }

  async alugar({ idUser, idFilme }) {
    await LocacaoService.insert({ idUser, idFilme });

    return FilmeModel.selectById(idFilme);
  }

  async devolver({ idUser, idFilme }) {
    await LocacaoService.deleteByIdFilmeAndIdUser({ idUser, idFilme });
  }
}

export default new FilmeService();
