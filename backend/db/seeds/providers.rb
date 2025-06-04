puts "Deleting existing providers..."
Provider.destroy_all

puts "🌱 Creating providers..."

providers = [
  { name: "General Services Ltd.", cnpj: "12345678000199", address: "Street A, 123", phone: "(11) 99999-1111", email: "contact@servgerais.com" },
  { name: "Alfa Construction", cnpj: "98765432000188", address: "Avenue B, 456", phone: "(11) 98888-2222", email: "sales@alfa.com.br" },
  { name: "Beta Maintenance", cnpj: "11122233000177", address: "Street C, 789", phone: "(11) 97777-3333", email: "support@beta.com" },
  { name: "Delta Cleaning", cnpj: "55566677000155", address: "Alley D, 321", phone: "(11) 96666-4444", email: "cleaning@delta.com" },
  { name: "Omega Security", cnpj: "44455566000144", address: "Square E, 654", phone: "(11) 95555-5555", email: "hr@omega.com" }
]

providers.each do |attrs|
  Provider.create!(attrs)
end

puts "✅ Providers successfully created!"
