class EmpresaSerializer
  include JSONAPI::Serializer

  attributes :cnpj, :inscricao_estadual, :inscricao_municipal,
             :razao_social, :nome_fantasia, :segmento

  def self.call(empresa)
    new(empresa).serializable_hash
  end
end
