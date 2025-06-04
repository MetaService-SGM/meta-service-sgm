class Service < ApplicationRecord
    has_many :general_contracts, dependent: :destroy
  end
