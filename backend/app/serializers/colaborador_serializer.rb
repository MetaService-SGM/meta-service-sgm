class ColaboradorSerializer
  def self.call(colaborador)
    {
      id: colaborador.id,
      nome: colaborador.nome,
      nome_completo: colaborador.nome_completo,
      nome_social: colaborador.nome_social,
      funcao: colaborador.funcao,
      cpf: colaborador.cpf,
      cbo: colaborador.cbo,
      genero: colaborador.genero,
      data_nasc: colaborador.data_nasc,
      cor_ou_raca: colaborador.cor_ou_raca,
      estado_civil: colaborador.estado_civil,
      pais: colaborador.pais,
      nacionalidade: colaborador.nacionalidade,
      situacao: colaborador.situacao,
      escolaridade: Colaborador.escolaridades[colaborador.escolaridade],
      altura: colaborador.altura,
      peso: colaborador.peso,
      foto_url: foto_url(colaborador),
      criado_em: colaborador.created_at,
      atualizado_em: colaborador.updated_at
    }
  end

  def self.foto_url(colaborador)
    return unless colaborador.foto.attached?

    Rails.application.routes.url_helpers.rails_blob_url(
      colaborador.foto,
      host: Rails.application.credentials.dig(:host) || 'http://localhost:3000'
    )
  end
end
