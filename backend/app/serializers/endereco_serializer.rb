class EnderecoSerializer
  include JSONAPI::Serializer

  attributes :ponto_referencia,
             :ponto_encontro,
             :cep,
             :uf,
             :municipio,
             :bairro,
             :logradouro,
             :numero,
             :complemento,
             :enderecoable_type,
             :enderecoable_id

  attribute :enderecoable_nome do |object|
    case object.enderecoable_type
    when 'Empresa'
      object.enderecoable&.razao_social
    when 'Colaborador'
      object.enderecoable&.nome
    else
      nil
    end
  end

  def self.call(resource)
    new(resource).serializable_hash[:data]
  end
end
