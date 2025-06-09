puts '🌱 Creating addresses...'

Faker::Config.locale = 'pt-BR'

if Employee.exists?
  puts "Seeding addresses for employees..."

  Employee.limit(5).each do |employee|
    begin
      Address.create!(
        zip_code: Faker::Base.regexify(/\d{5}-?\d{3}/),
        state: Faker::Address.state_abbr,
        city: Faker::Address.city,
        district: Faker::Address.community,
        street: Faker::Address.street_name,
        number: Faker::Address.building_number,
        complement: Faker::Address.secondary_address,
        meeting_point: Faker::Lorem.sentence(word_count: 3),
        landmark: Faker::Lorem.sentence(word_count: 3),
        addressable: employee
      )
    rescue => e
      puts "❌ Error creating address for Employee ID #{employee.id}: #{e.message}"
    end
  end

  puts "✅ Addresses for employees created!"
else
  puts "⚠️ No employee found. Skipping address seeding."
end

if Company.exists?
  puts "Seeding addresses for companies..."

  Company.limit(5).each do |company|
    begin
      Address.create!(
        zip_code: Faker::Base.regexify(/\d{5}-?\d{3}/),
        state: Faker::Address.state_abbr,
        city: Faker::Address.city,
        district: Faker::Address.community,
        street: Faker::Address.street_name,
        number: Faker::Address.building_number,
        complement: Faker::Address.secondary_address,
        addressable: company
      )
    rescue => e
      puts "❌ Error creating address for Company ID #{company.id}: #{e.message}"
    end
  end

  puts "✅ Addresses for companies created!"
else
  puts "⚠️ No company found. Skipping address seeding."
end

puts '✅ Finished address seeding!'
