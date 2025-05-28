puts '🌱 Criando contatos...'
puts "Seeding contatos para colaboradores..."

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

puts "Seeding contatos para empresas..."

Empresa.find_each do |empresa|
  Contato.create!(
    numero: Faker::PhoneNumber.cell_phone_in_e164,
    email: Faker::Internet.email(domain: "empresa.com"),
    whatsapp: [true, false].sample,
    telegram: [true, false].sample,
    signal: [true, false].sample,
    contatoable: empresa
  )
end

puts puts "Cadastrados #{contatos.count} contatos para Empresas"

puts "✅ Contatos criados com sucesso!"
