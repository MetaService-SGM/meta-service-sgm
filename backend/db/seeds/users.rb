
puts "Apagando usuários existentes..."
User.destroy_all

puts "🌱 Criando usuários..."

users = [
  { name: "Admin 1", email: "admin1@example.com", password: "password123", role: :admin, cpf: CPF.generate, contract_type: "CLT", active: true },
  { name: "Gerente 1", email: "gerente1@example.com", password: "password123", role: :gerente, cpf: CPF.generate, contract_type: "PJ", active: true },
  { name: "Contratado 1", email: "contratado1@example.com", password: "password123", role: :contratado, cpf: CPF.generate, contract_type: "Estágio", active: false },
  { name: "Contratado 2", email: "contratado2@example.com", password: "password123", role: :contratado, cpf: CPF.generate, contract_type: "CLT", active: true },
  { name: "Gerente 2", email: "gerente2@example.com", password: "password123", role: :gerente, cpf: CPF.generate, contract_type: "PJ", active: false }
]

users.each do |attrs|
  User.create!(
    name: attrs[:name],
    email: attrs[:email],
    password: attrs[:password],
    password_confirmation: attrs[:password],
    role: attrs[:role],
    cpf: attrs[:cpf],
    contract_type: attrs[:contract_type],
    active: attrs[:active],
    confirmed_at: Time.current 
  )
end

puts "✅ Usuários criados com sucesso!"
