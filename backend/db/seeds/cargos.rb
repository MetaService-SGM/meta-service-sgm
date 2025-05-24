puts '🌱 Criando cargos...'

Cargo.create!([
  { nome: 'Desenvolvedor' },
  { nome: 'Designer' },
  { nome: 'Gerente' }
])

puts '✅ Cargos criados com sucesso!'
