class FilmeController {
  async buscarFilmes(req, res) {
    return res.json({ message: 'filmes encontrados' });
  }

  async alugar(req, res) {
    return res.json({ message: 'filme alugado' });
  }

  async devolver(req, res) {
    return res.json({ message: 'filme devolvido' });
  }
}

export default new FilmeController();
