puts "🌱 Criando dependentes..."

colaboradores = Colaborador.all

10.times do
  colaborador = colaboradores.sample

  Dependente.create!(
    nome: Faker::Name.first_name,
    parentesco: %w[Filho Cônjuge].sample,
    data_nascimento: Faker::Date.between(from: '2005-01-01', to: '2022-12-31'),
    colaborador: colaborador
  )
end

puts "✅ Dependentes criados com sucesso!"
