class Cargo < ApplicationRecord

  validates :nome, presence: true

  def self.ransackable_attributes(auth_object = nil)
    %w[nome]
  end
end
