puts "🔧 Creating employee contracts..."

Faker::Config.locale = 'pt-BR'

employees = Employee.limit(5)
positions = Position.all.to_a
departments = Department.all.to_a

employees.each do |employee|
  EmployeeContract.create!(
    contract_type: 'CLT',
    unit: 'Unidade Central',
    shift: 'Diurno',
    currency: 'BRL',
    hourly_wage: rand(19.0..50.0).round(2),
    admission_date: Date.today - 365,
    trial_period: 90,
    registration_number: SecureRandom.hex(4),
    direct_supervisor: Faker::Name.name,
    hierarchy_level: ['Junior', 'Mid', 'Senior'].sample,
    contract_date: Date.today - 365,
    contract_duration: 730,
    contract_expiration: Date.today + 365,
    total_days: 730,
    total_hours: 44,
    employee_id: employee.id,
    position_id: positions.sample&.id,
    department_id: departments.sample&.id
  )
end

puts "✅ Employee contracts successfully created!"
