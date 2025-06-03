class Certificacao < ApplicationRecord
  belongs_to :colaborador
  belongs_to :cargo
  has_one_attached :pdf

  validates :nome, presence: true, length: { maximum: 100 }
  validates :data_emissao, presence: true
  validates :validade, presence: true
  validates :pdf, attached: true, content_type: ['application/pdf']
end
