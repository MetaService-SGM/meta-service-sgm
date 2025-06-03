puts '🌱 Criando contatos...'

Faker::Config.locale = 'pt-BR'

colaboradores = Colaborador.limit(5)
contatos = []

colaboradores.each do |colaborador|
  contatos << Contato.create!(
    telefone: Faker::PhoneNumber.cell_phone_in_e164,
    email: Faker::Internet.unique.email,
    whatsapp: ['true', 'false'].sample,
    telegram: ['true', 'false'].sample,
    signal: ['true', 'false'].sample,
    tipo_telefone: ['fixo', 'movel'].sample,
    departamento: ['Financeiro', 'RH', 'TI'].sample,
    operadora: ['Vivo', 'Claro', 'Tim', 'Oi'].sample,
    contatoable: colaborador
  )
end

puts "Cadastrados #{contatos.count} contatos para colaboradores"
