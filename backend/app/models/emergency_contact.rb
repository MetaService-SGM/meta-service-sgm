class EmergencyContact < ApplicationRecord
  # Associação com o employee
  belongs_to :employee
  
  # Validações conforme as instruções
  validates :full_name, :phone, :kinship, :carrier, presence: true
end
