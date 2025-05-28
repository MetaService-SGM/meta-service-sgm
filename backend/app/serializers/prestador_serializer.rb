class PrestadorSerializer
  include JSONAPI::Serializer
  attributes :nome, :cnpj, :endereco, :telefone, :email, :created_at, :updated_at
end
