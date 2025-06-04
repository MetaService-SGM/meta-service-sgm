class Position < ApplicationRecord

  validates :name, presence: true

  def self.ransackable_attributes(auth_object = nil)
    %w[name]
  end
end
