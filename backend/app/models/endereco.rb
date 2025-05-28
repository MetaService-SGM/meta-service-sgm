class Endereco < ApplicationRecord
  belongs_to :enderecoable, polymorphic: true

  validates :cep, :uf, :municipio, :bairro, :logradouro, :numero, presence: true
  validates :cep, format: { with: /\A\d{5}-?\d{3}\z/, message: 'deve estar no formato 00000-000 ou 00000000' }
  validates :uf, format: { with: /\A[A-Z]{2}\z/, message: 'deve conter exatamente 2 letras maiúsculas' }
  validates :enderecoable_type, :enderecoable_id, presence: true

  def self.ransackable_attributes(auth_object = nil)
    %w[
      ponto_referencia ponto_encontro cep uf municipio bairro logradouro
      numero complemento enderecoable_type enderecoable_id
    ]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
