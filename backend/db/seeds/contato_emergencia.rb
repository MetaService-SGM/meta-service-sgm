puts '🌱 Criando contatos de emergência...'

Faker::Config.locale = 'pt-BR'

contatos_emergencia = 0
colaboradores = Colaborador.all

5.times do
  ContatoEmergencia.create!(
    nome: Faker::Name.name,
    telefone: Faker::PhoneNumber.cell_phone_in_e164,
    parentesco: Faker::Relationship.familial,
    colaborador: colaboradores.sample,
    operadora: ['Vivo', 'Claro', 'Tim', 'Oi', 'telefonica'].sample
  )
  contatos_emergencia += 1
end

puts "🆘 Criados #{contatos_emergencia} contatos de emergência"
puts "✅ Seeds de contatos atualizadas com sucesso!"