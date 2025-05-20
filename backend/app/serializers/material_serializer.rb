class MaterialSerializer
    include JSONAPI::Serializer
    attributes :id, :nome, :categoria, :unidade_medida, :quantidade_minima, :quantidade_atual, :created_at, :updated_at
  end
  