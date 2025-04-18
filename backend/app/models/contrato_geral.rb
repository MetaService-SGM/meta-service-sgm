class ContratoGeral < ApplicationRecord
    belongs_to :prestador
    belongs_to :cliente
    belongs_to :servico
  
    has_many :contrato_colaboradors, dependent: :destroy
    has_many :material_contratos, dependent: :destroy
  end
