class MaterialContrato < ApplicationRecord
    belongs_to :material
    belongs_to :contrato_geral
  end
