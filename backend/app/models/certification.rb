class Certification < ApplicationRecord
  belongs_to :employee
  belongs_to :position
  has_one_attached :pdf

  validates :name, presence: true, length: { maximum: 100 }
  validates :issue_date, presence: true
  validates :expiration_date, presence: true
  validates :pdf, attached: true, content_type: ['application/pdf']
end
