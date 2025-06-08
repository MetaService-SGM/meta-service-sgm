puts '🌱 Creating contacts...'

Faker::Config.locale = 'pt-BR'

employees = Employee.limit(5)
contacts = []

employees.each do |employee|
  contacts << Contact.create!(
    phone: Faker::PhoneNumber.cell_phone_in_e164,
    email: Faker::Internet.unique.email,
    whatsapp: ['true', 'false'].sample,
    telegram: ['true', 'false'].sample,
    signal: ['true', 'false'].sample,
    phone_type: ['landline', 'mobile'].sample,
    department: ['Finance', 'HR', 'IT'].sample,
    carrier: ['Vivo', 'Claro', 'Tim', 'Oi'].sample,
    contactable: employee
  )
end

Company.limit(5).each do |company|
  contacts << Contact.create!(
    phone: Faker::PhoneNumber.cell_phone_in_e164,
    email: Faker::Internet.unique.email,
    whatsapp: ['true', 'false'].sample,
    telegram: ['true', 'false'].sample,
    signal: ['true', 'false'].sample,
    phone_type: ['landline', 'mobile'].sample,
    department: ['Finance', 'HR', 'IT'].sample,
    carrier: ['Vivo', 'Claro', 'Tim', 'Oi'].sample,
    contactable: company
  )
end

puts "✅ Registered #{contacts.count} contacts for employees and companies"
