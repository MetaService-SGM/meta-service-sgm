FactoryBot.define do
  factory :company do
    corporate_name { Faker::Company.name }
    cnpj { CNPJ.generate }
  end
end
