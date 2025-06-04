require 'faker'
require 'cpf_cnpj'
Faker::Config.locale = 'pt-BR'

puts '🌱 Creating companies...'

5.times do
  Company.create!(
    cnpj: CNPJ.generate,
    state_registration: Faker::Number.number(digits: 9),
    municipal_registration: Faker::Number.number(digits: 8),
    corporate_name: Faker::Company.name,
    trade_name: Faker::Company.industry,
    business_segment: Faker::Company.profession
  )
end

puts "✅ Companies created successfully!"
