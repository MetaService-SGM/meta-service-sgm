class EmployeeContractSerializer
  def self.call(obj)
    {
      id: obj.id,
      contract_type: obj.contract_type,
      unit: obj.unit,
      shift: obj.shift,
      currency: obj.currency,
      hourly_wage: obj.hourly_wage,
      admission_date: obj.admission_date,
      trial_period: obj.trial_period,
      registration_number: obj.registration_number,
      direct_supervisor: obj.direct_supervisor,
      hierarchy_level: obj.hierarchy_level,
      contract_date: obj.contract_date,
      contract_duration: obj.contract_duration,
      contract_expiration: obj.contract_expiration,
      total_days: obj.total_days,
      employee_id: obj.employee_id,
      position_id: obj.position_id,
      department_id: obj.department_id
    }
  end
end
