FactoryBot.define do
  factory :document do
    tipo { "MyString" }
    numero { "MyString" }
    orgao_emissor { "MyString" }
    data_emissao { "2025-06-10" }
    colaborador { nil }
  end
end
