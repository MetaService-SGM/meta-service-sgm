class Contact < ApplicationRecord
  belongs_to :contactable, polymorphic: true

  enum phone_type: { landline: 0, mobile: 1 }

  validates :phone, presence: true
  validates :phone_type, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
  validates :carrier, presence: true, if: -> { phone_type == 'mobile' }
  validates :department, presence: true, if: -> { contactable_type == 'Company' }

  def self.ransackable_attributes(auth_object = nil)
    %w[ email phone phone_type carrier contactable_type contactable_id]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
