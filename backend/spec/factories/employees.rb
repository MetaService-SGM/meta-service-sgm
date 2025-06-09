FactoryBot.define do
  factory :employee do
    full_name { Faker::Name.name }
    cpf { CPF.generate }
  end
end
