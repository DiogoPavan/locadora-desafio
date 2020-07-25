import status from 'http-status';

import FilmeService from '../services/FilmeService';

class FilmeController {
  async findAll(req, res) {
    const { titulo, disponivel } = req.query;

    const filmes = await FilmeService.findAll({ titulo, disponivel });

    return res.status(status.OK).send({ data: filmes });
  }

  async alugar(req, res) {
    const { idUserLogado } = req;
    const { idFilme } = req.body;

    const filme = await FilmeService.alugar({ idUser: idUserLogado, idFilme });

    return res.status(status.OK).send({
      message: 'Filme alugado com sucesso',
      data: filme,
    });
  }

  async devolver(req, res) {
    const { idUserLogado } = req;
    const { idFilme } = req.body;

    await FilmeService.devolver({ idUser: idUserLogado, idFilme });

    return res.status(status.OK).send({ message: 'Filme devolvido com sucesso' });
  }
}

export default new FilmeController();
