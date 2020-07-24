import FilmeService from '../services/FilmeService';

class FilmeController {
  async buscarFilmes(req, res) {
    const { titulo, disponivel } = req.query;

    const filmes = await FilmeService.buscarFilmes({ titulo, disponivel });

    return res.json({ status: 'ok', data: filmes });
  }

  async alugar(req, res) {
    const { idUserLogado } = req;
    const { idFilme } = req.body;

    const filme = await FilmeService.alugar({ idUser: idUserLogado, idFilme });

    return res.json({
      message: 'Filme alugado com sucesso',
      status: 'OK',
      data: filme,
    });
  }

  async devolver(req, res) {
    const { idUserLogado } = req;
    const { idFilme } = req.body;

    await FilmeService.devolver({ idUser: idUserLogado, idFilme });

    return res.json({ message: 'Filme devolvido com sucesso', status: 'OK' });
  }
}

export default new FilmeController();
