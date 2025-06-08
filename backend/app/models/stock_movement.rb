class StockMovement < ApplicationRecord
  enum movement_type: { out: 0, return: 1, rollback: 2, in: 3 }

  belongs_to :material
  belongs_to :work_order, optional: true
  belongs_to :employee, optional: true
  belongs_to :approver, class_name: 'User', optional: true
  belongs_to :rollback_from, class_name: 'StockMovement', optional: true

  validates :movement_type, :quantity, :moved_at, presence: true
  validates :movement_type, inclusion: { in: movement_types.keys }
end
