puts "Apagando materiais existentes..."
Material.destroy_all

puts "🌱 Criando materiais..."

materials = [
  { nome: "Capacete de Segurança", categoria: "EPI", unidade_medida: "unidade", quantidade_minima: 10, quantidade_atual: 25 },
  { nome: "Luva de Proteção", categoria: "EPI", unidade_medida: "par", quantidade_minima: 50, quantidade_atual: 80 },
  { nome: "Botina de Segurança", categoria: "EPI", unidade_medida: "par", quantidade_minima: 20, quantidade_atual: 40 },
  { nome: "Protetor Auricular", categoria: "EPI", unidade_medida: "unidade", quantidade_minima: 30, quantidade_atual: 60 },
  { nome: "Máscara Respiratória", categoria: "EPI", unidade_medida: "unidade", quantidade_minima: 15, quantidade_atual: 35 }
]

materials.each do |attrs|
  Material.create!(attrs)
end

puts "✅ Materiais criados com sucesso!"
