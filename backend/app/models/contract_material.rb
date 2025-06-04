class ContractMaterial < ApplicationRecord
    belongs_to :material
    belongs_to :general_contract
  end
