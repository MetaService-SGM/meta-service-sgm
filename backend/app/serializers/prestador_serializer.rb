class PrestadorSerializer
    include JSONAPI::Serializer
    attributes :id, :nome, :cnpj, :endereco, :telefone, :email, :created_at, :updated_at
  end
