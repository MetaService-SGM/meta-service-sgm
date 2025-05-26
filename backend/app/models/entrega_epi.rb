class EntregaEpi < ApplicationRecord
  belongs_to :funcionario
  belongs_to :ordem_servico
  belongs_to :epi

  validates :data_retirada, presence: true
end