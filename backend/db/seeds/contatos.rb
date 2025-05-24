puts '🌱 Criando contatos...'

colaboradores = Colaborador.limit(5)
contatos = []

colaboradores.each_with_index do |colaborador, i|
  contatos << Contato.create!(
    numero: Faker::PhoneNumber.cell_phone_in_e164,
    email: Faker::Internet.unique.email,
    whatsapp: [true, false].sample,
    telegram: [true, false].sample,
    signal: [true, false].sample,
    contatoable: colaborador
  )
end

puts "Cadastrados #{contatos.count} contatos para colaboradores"

puts "✅ Contatos criados com sucesso!"