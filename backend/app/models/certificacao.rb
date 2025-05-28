class Certificacao < ApplicationRecord
  belongs_to :colaborador
  belongs_to :cargo

  validates :nome, presence: true, length: { maximum: 100 }
  validates :data_emissao, presence: true
  validates :validade, presence: true
end
