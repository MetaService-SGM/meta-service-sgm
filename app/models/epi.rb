class Epi < ApplicationRecord
    has_many :entrega_epis, dependent: :destroy
  end
