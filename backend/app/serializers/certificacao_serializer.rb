class CertificacaoSerializer
  def self.call(certificacao)
    {
      id: certificacao.id,
      nome: certificacao.nome,
      data_emissao: certificacao.data_emissao,
      validade: certificacao.validade,
      colaborador_id: certificacao.colaborador_id,
      colaborador_nome: certificacao.colaborador.nome,
      cargo_id: certificacao.cargo_id,
      cargo_nome: certificacao.cargo.nome
    }
  end
end
