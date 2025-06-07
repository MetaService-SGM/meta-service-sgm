class WorkOrder < ApplicationRecord

  enum status: { opened: 0, in_analysis: 1, closed: 2, completed: 3, canceled: 4, reopened: 5 }
  enum priority: { low: 0, medium: 1, high: 2 }

  has_many :work_order_materials, dependent: :destroy
  has_many :materials, through: :work_order_materials
  has_many :work_order_employees, dependent: :destroy
  has_many :employees, through: :work_order_employees
  has_many :stock_movements, dependent: :nullify

  accepts_nested_attributes_for :work_order_materials
  accepts_nested_attributes_for :work_order_employees
  
  validates :opened_at, :requester_name, :status, :priority, presence: true
end
