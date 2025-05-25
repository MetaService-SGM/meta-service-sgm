puts "Apagando materiais existentes..."
Material.destroy_all

puts "🌱 Criando materiais..."

require 'faker'

categorias = ['EPI', 'Limpeza', 'Papelaria', 'Ferramenta', 'Informática']
unidades = ['unitário', 'par', 'centímetros', 'polegadas', 'metros']
cores = %w[Preta Branca Azul Vermelha Amarela Verde Transparente]
tamanhos = %w[P M G 38 39 40 41 42]

50.times do
  categoria = categorias.sample

  attrs = {
    nome: Faker::Commerce.product_name,
    categoria: categoria,
    unidade_medida: unidades.sample,
    quantidade_minima: rand(5..50),
    quantidade_atual: rand(10..200),
    tipo: Faker::Commerce.material,
    cor: cores.sample,
    tamanho: [true, false].sample ? tamanhos.sample : nil
  }

  if categoria == 'EPI'
    attrs[:certif_aprov] = "CA#{rand(10000..99999)}"
  end

  Material.create!(attrs)
end


puts "✅ Materiais criados com sucesso!"
