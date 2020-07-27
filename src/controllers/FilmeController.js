import status from 'http-status';

import FilmeService from '../services/FilmeService';

class FilmeController {
  constructor(container) {
    this.filmeService = container.get(FilmeService);
  }

  async findAll(req, res) {
    const { titulo, disponivel } = req.query;

    const filmes = await this.filmeService.findAll({ titulo, disponivel });

    return res.status(status.OK).send({ data: filmes });
  }

  async alugar(req, res) {
    const { idUserLogado } = req;
    const { idFilme } = req.body;

    const filme = await this.filmeService.alugar(idFilme, idUserLogado);

    return res.status(status.OK).send({
      message: 'Filme alugado com sucesso',
      data: filme,
    });
  }

  async devolver(req, res) {
    const { idUserLogado } = req;
    const { idFilme } = req.body;

    await this.filmeService.devolver(idFilme, idUserLogado);

    return res.status(status.OK).send({ message: 'Filme devolvido com sucesso' });
  }
}

export default FilmeController;
