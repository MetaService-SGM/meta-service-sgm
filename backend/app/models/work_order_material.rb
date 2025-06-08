class WorkOrderMaterial < ApplicationRecord
  belongs_to :work_order
  belongs_to :material

  validates :quantity, numericality: { greater_than: 0 }
end
