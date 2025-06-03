class DependenteSerializer
  def self.call(dependente)
    {
      id: dependente.id,
      nome: dependente.nome,
      parentesco: dependente.parentesco,
      data_nascimento: dependente.data_nascimento,
      idade: idade(dependente),
      colaborador_id: dependente.colaborador_id,
      documento_url: documento_url(dependente)
    }
  end

  def self.documento_url(dependente)
    return unless dependente.documento.attached?

    Rails.application.routes.url_helpers.rails_blob_url(
      dependente.documento,
      host: Rails.application.credentials.dig(:host) || 'localhost:3000'
    )
  end

  def self.idade(dependente)
    return unless dependente.data_nascimento

    now = Time.zone.today
    dob = dependente.data_nascimento
    now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
  end
end
