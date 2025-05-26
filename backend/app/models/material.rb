class Material < ApplicationRecord
  before_create :set_cod_int
  
  validates :certif_aprov, presence: true, if: -> { categoria&.downcase == 'epi' }

  def self.ransackable_attributes(auth_object = nil)
    %w[
      categoria
      certif_aprov
      cod_int
      cor
      created_at
      id
      nome
      quantidade_atual
      quantidade_minima
      tamanho
      tipo
      unidade_medida
      updated_at
    ]
  end

  private

  def set_cod_int
    last_cod = Material.maximum(:cod_int) || 0
    self.cod_int = last_cod + 1
  end
  end
