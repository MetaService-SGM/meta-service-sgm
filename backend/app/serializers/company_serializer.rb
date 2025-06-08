class CompanySerializer
  include JSONAPI::Serializer

  attributes :cnpj, :state_registration, :municipal_registration,
             :corporate_name, :trade_name, :business_segment

  def self.call(company)
    new(company).serializable_hash
  end
end
