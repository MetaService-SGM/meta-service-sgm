class WorkOrderSerializer
  def self.call(work_order)
    {
      id: work_order.id,
      client_order_number: work_order.client_order_number,
      opened_at: work_order.opened_at,
      started_at: work_order.started_at,
      expected_end_at: work_order.expected_end_at,
      status: work_order.status,
      priority: work_order.priority,
      requester_name: work_order.requester_name,
      requester_department: work_order.requester_department,
      requester_contact: work_order.requester_contact,
      responsible: work_order.responsible,
      notes: work_order.notes,
      expected_days: work_order.expected_days,
      value: work_order.value,
      materials: work_order.work_order_materials.map { |wm| WorkOrderMaterialSerializer.call(wm) },
      employees: work_order.employees.map { |e| { id: e.id, first_name: e.first_name } },
    }
  end
end
