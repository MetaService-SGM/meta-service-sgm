puts '🌱 Creating employees...'

Faker::Config.locale = 'pt-BR'

genders = ['Male', 'Female', 'Not Informed']
ethnicities = ['White', 'Brown', 'Black', 'Yellow', 'Indigenous']
marital_statuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Cohabitating']
statuses = ['active', 'inactive']
education_levels = Employee.education_levels.keys
functions = ['Administrative Assistant', 'Safety Technician', 'Engineer', 'HR Analyst', 'Technical Coordinator']
cbos = ['4110-05', '3516-05', '2149-05', '2524-10', '1236-05']

5.times do
  gender = genders.sample
  full_name = Faker::Name.name_with_middle
  first_name = full_name.split.first
  social_name = [Faker::Name.first_name, ''].sample
  Employee.create!(
    first_name: first_name,
    full_name: full_name,
    social_name: social_name,
    function: functions.sample,
    cpf: CPF.generate,
    gender: gender,
    birth_date: Faker::Date.birthday(min_age: 25, max_age: 60),
    ethnicity: ethnicities.sample,
    marital_status: marital_statuses.sample,
    country: 'Brazil',
    status: statuses.sample,
    nationality: 'Brazilian',
    cbo: cbos.sample,
    education_level: education_levels.sample,
    height: rand(1.55..1.90).round(2),
    weight: rand(50.0..95.0).round(1)
  )
end

puts '✅ Employees successfully created!'
