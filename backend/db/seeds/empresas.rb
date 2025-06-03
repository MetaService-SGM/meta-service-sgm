require 'faker'
require 'cpf_cnpj'
Faker::Config.locale = 'pt-BR'

puts '🌱 Criando empresas...'

5.times do
  Empresa.create!(
    cnpj: CNPJ.generate,
    inscricao_estadual: Faker::Number.number(digits: 9),
    inscricao_municipal: Faker::Number.number(digits: 8),
    razao_social: Faker::Company.name,
    nome_fantasia: Faker::Company.industry,
    segmento: Faker::Company.profession
  )
end

puts "✅ Empresas criadas com sucesso!"
