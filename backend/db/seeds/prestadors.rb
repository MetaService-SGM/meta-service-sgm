puts "Apagando prestadores existentes..."
Prestador.destroy_all

puts "🌱 Criando prestadores..."

prestadors = [
  { nome: "Serviços Gerais LTDA", cnpj: "12345678000199", endereco: "Rua A, 123", telefone: "(11) 99999-1111", email: "contato@servgerais.com" },
  { nome: "Construtora Alfa", cnpj: "98765432000188", endereco: "Avenida B, 456", telefone: "(11) 98888-2222", email: "comercial@alfa.com.br" },
  { nome: "Manutenção Beta", cnpj: "11122233000177", endereco: "Rua C, 789", telefone: "(11) 97777-3333", email: "suporte@beta.com" },
  { nome: "Limpeza Delta", cnpj: "55566677000155", endereco: "Travessa D, 321", telefone: "(11) 96666-4444", email: "limpeza@delta.com" },
  { nome: "Segurança Ômega", cnpj: "44455566000144", endereco: "Praça E, 654", telefone: "(11) 95555-5555", email: "rh@omega.com" }
]

prestadors.each do |attrs|
  Prestador.create!(attrs)
end

puts "✅ Prestadores criados com sucesso!"
