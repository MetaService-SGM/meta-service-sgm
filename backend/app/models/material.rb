class Material < ApplicationRecord
  before_create :set_internal_code
  
  validates :approval_certificate, presence: true, if: -> { category&.downcase == 'epi' }

  def self.ransackable_attributes(auth_object = nil)
    %w[
      category
      approval_certificate
      internal_code
      color
      created_at
      id
      name
      current_quantity
      minimum_quantity
      size
      material_type
      unit_of_measure
      updated_at
    ]
  end

  private

  def set_internal_code
    last_cod = Material.maximum(:internal_code) || 0
    self.internal_code = last_cod + 1
  end
  end
