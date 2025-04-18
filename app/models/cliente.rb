class Cliente < ApplicationRecord
    has_many :contrato_gerals, dependent: :destroy
  end
