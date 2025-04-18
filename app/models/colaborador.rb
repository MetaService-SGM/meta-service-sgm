class Colaborador < ApplicationRecord
    has_many :contrato_colaboradors, dependent: :destroy
    has_many :entrega_epis, dependent: :destroy
  end
