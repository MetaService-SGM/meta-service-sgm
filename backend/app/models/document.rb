class Document < ApplicationRecord
  belongs_to :employee

  validates :tipo, presence: true
  validates :numero, presence: true, uniqueness: { scope: :employee_id }
  validates :orgao_emissor, presence: true
  validates :data_emissao, presence: true
end
