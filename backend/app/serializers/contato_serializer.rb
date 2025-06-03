class ContatoSerializer
  include JSONAPI::Serializer

  attributes :id, :telefone, :tipo_telefone, :operadora, :email, :whatsapp, :telegram,
             :signal, :contatoable_type, :contatoable_id

  def self.call(object)
    new(object).serializable_hash
  end
end
