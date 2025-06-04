class ProviderSerializer
  include JSONAPI::Serializer
  attributes :name, :cnpj, :address, :phone, :email, :created_at, :updated_at
end
