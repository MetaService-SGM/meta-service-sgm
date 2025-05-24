class ContatoSerializer
  include JSONAPI::Serializer

  attributes :id, :numero, :email, :whatsapp, :telegram, :signal, :contatoable_type, :contatoable_id

  def self.call(object)
    new(object).serializable_hash
  end
end
