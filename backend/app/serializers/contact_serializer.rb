class ContactSerializer
  include JSONAPI::Serializer

  attributes :id, :phone, :phone_type, :carrier, :email, :whatsapp, :telegram,
             :signal, :contactable_type, :contactable_id

  def self.call(object)
    new(object).serializable_hash
  end
end
