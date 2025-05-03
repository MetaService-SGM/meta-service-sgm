class Epi < ApplicationRecord
  has_many :entrega_epis, dependent: :destroy

  validates :nome, :ca, presence: true
end