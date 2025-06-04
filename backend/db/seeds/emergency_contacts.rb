puts '🌱 Creating emergency contacts...'

Faker::Config.locale = 'pt-BR'

emergency_contacts_count = 0
employees = Employee.all

5.times do
  EmergencyContact.create!(
    full_name: Faker::Name.name,
    phone: Faker::PhoneNumber.cell_phone_in_e164,
    kinship: Faker::Relationship.familial,
    employee: employees.sample,
    carrier: ['Vivo', 'Claro', 'Tim', 'Oi', 'Telefonica'].sample
  )
  emergency_contacts_count += 1
end

puts "🆘 #{emergency_contacts_count} emergency contacts created"
puts "✅ Emergency contacts seeds successfully completed!"
