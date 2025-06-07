class StockManager
  def self.process_movement!(
    type:,
    material_id:,
    quantity:,
    moved_at:,
    employee_id:,
    work_order_id:,
    notes:,
    approver:,
    rollback_from_id: nil
  )
    material = Material.find(material_id)
    quantity = quantity.to_i

    stock_movement = StockMovement.create!(
      material_id: material_id,
      quantity: quantity,
      moved_at: moved_at,
      employee_id: employee_id,
      work_order_id: work_order_id,
      notes: notes,
      movement_type: type,
      approver: approver,
      rollback_from_id: rollback_from_id
    )

    case type.to_sym
    when :in, :return
      material.increment!(:current_quantity, quantity)
    when :out
      material.decrement!(:current_quantity, quantity)
    when :rollback
      raise ActiveRecord::RecordNotFound, "Movimentação original não encontrada." if rollback_from_id.blank?

      original = StockMovement.find(rollback_from_id)
      case original.movement_type.to_sym
      when :in, :return
        material.decrement!(:current_quantity, quantity)
      when :out
        material.increment!(:current_quantity, quantity)
      else
        raise ActiveRecord::Rollback, "Tipo de movimentação inválido para rollback."
      end
    end

    stock_movement
  end
end
