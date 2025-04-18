class ContratoColaborador < ApplicationRecord
    belongs_to :colaborador
    belongs_to :contrato_geral
  end
