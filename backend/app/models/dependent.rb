class Dependent < ApplicationRecord
  belongs_to :employee
  has_one_attached :documento

  validates :full_name, :kinship, :birth_date, presence: true

  def age
    return unless birth_date
    now = Time.zone.now.to_date
    now.year - birth_date.year - ((now.month > birth_date.month || (now.month == birth_date.month && now.day >= birth_date.day)) ? 0 : 1)
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[employee_id created_at birth_date id full_name kinship age updated_at]
  end  
end
