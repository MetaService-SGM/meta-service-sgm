class Material < ApplicationRecord
    has_many :material_contratos, dependent: :destroy
  end
