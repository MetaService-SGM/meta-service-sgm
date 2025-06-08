class EmployeeContract < ApplicationRecord
  belongs_to :employee
  belongs_to :position
  belongs_to :department

  validates :employee_id, uniqueness: true 

  validates :contract_type, :unit, :shift, :currency, :hourly_wage,
            :admission_date, :trial_period, :registration_number,
            :direct_supervisor, :hierarchy_level, :contract_date,
            :contract_duration, :contract_expiration, :total_days,
            :total_hours,
            presence: true

  def self.ransackable_attributes(auth_object = nil)
    %w[contract_type unit shift currency hourly_wage admission_date trial_period registration_number
       direct_supervisor hierarchy_level contract_date contract_duration contract_expiration
       total_days employee_id position_id department_id total_hours]
  end
end
