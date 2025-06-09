class AddressSerializer
  include JSONAPI::Serializer

  attributes :zip_code,
             :state,
             :city,
             :district,
             :street,
             :number,
             :complement,
             :meeting_point,
             :landmark,
             :addressable_type,
             :addressable_id

  attribute :addressable_name do |object|
    case object.addressable_type
    when 'Company'
      object.addressable&.corporate_name
    when 'Employee'
      object.addressable&.full_name
    else
      nil
    end
  end

  def self.call(resource)
    new(resource).serializable_hash[:data]
  end
end
