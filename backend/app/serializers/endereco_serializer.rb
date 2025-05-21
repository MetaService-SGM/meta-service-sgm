class EnderecoSerializer < ApplicationSerializer
  include JSONAPI::Serializer
  attributes :ponto_referencia, :ponto_encontro, :cep, :uf, :municipio,
             :bairro, :logradouro, :numero, :complemento, :colaborador_id
end
