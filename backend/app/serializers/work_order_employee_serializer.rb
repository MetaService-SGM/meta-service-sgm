class WorkOrderEmployeeSerializer
  def self.call(work_order_employee)
    {
      id: work_order_employee.id,
      work_order_id: work_order_employee.work_order_id,
      employee_id: work_order_employee.employee_id,
      created_at: work_order_employee.created_at,
      updated_at: work_order_employee.updated_at
    }
  end
end
