class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  validates :zip_code, :state, :city, :district, :street, :number, presence: true
  validates :zip_code, format: { with: /\A\d{5}-?\d{3}\z/, message: 'deve estar no formato 00000-000 ou 00000000' }
  validates :state, format: { with: /\A[A-Z]{2}\z/, message: 'deve conter exatamente 2 letras maiúsculas' }
  validates :addressable_type, :addressable_id, presence: true
  validates :meeting_point, :landmark, presence: true, if: :for_employee?
  validate :block_meeting_point_and_landmark_for_non_employee

  def self.ransackable_attributes(auth_object = nil)
    %w[
      zip_code state city district street number complement
      addressable_type addressable_id meeting_point landmark
    ]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end

  private

  def for_employee?
    addressable_type == 'Employee'
  end

  def block_meeting_point_and_landmark_for_non_employee
    return if for_employee?

    if meeting_point.present? || landmark.present?
      errors.add(:base, I18n.t("errors.messages.address_fields_not_allowed"))
    end
  end
end
