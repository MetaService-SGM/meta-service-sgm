class Epi < ApplicationRecord
  has_many :entrega_epis, dependent: :destroy

  validates :descricao, :ca, presence: true
end