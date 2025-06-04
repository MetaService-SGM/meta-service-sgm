puts "🌱 Creating dependents..."

Faker::Config.locale = 'pt-BR'

employees = Employee.all

10.times do
  employee = employees.sample

  Dependent.create!(
    full_name: Faker::Name.first_name,
    kinship: %w[Child Spouse].sample,
    birth_date: Faker::Date.between(from: '2005-01-01', to: '2022-12-31'),
    employee: employee
  )
end

puts "✅ Dependents successfully created!"