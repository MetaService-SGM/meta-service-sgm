class StockMovementSerializer
  def self.call(stock_movement)
    {
      id: stock_movement.id,
      material_id: stock_movement.material_id,
      work_order_id: stock_movement.work_order_id,
      quantity: stock_movement.quantity,
      moved_at: stock_movement.moved_at,
      movement_type: stock_movement.movement_type,
      employee_id: stock_movement.employee_id,
      notes: stock_movement.notes,
      created_at: stock_movement.created_at,
      updated_at: stock_movement.updated_at
    }
  end
end
