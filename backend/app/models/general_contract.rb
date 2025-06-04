class GeneralContract < ApplicationRecord
    belongs_to :provider
    belongs_to :client
    belongs_to :service
  
    has_many :employee_contracts, dependent: :destroy
    has_many :contract_materials, dependent: :destroy
  end
