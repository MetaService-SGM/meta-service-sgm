puts "Deleting existing materials..."
Material.destroy_all

puts "🌱 Creating materials..."

Faker::Config.locale = 'pt-BR'

categories = ['EPI', 'Cleaning', 'Stationery', 'Tool', 'IT']
units = ['unit', 'pair', 'centimeters', 'inches', 'meters']
colors = %w[Black White Blue Red Yellow Green Transparent]
sizes = %w[S M L 38 39 40 41 42]

50.times do
  category = categories.sample

  attrs = {
    name: Faker::Commerce.product_name,
    category: category,
    unit_of_measure: units.sample,
    minimum_quantity: rand(5..50),
    current_quantity: rand(10..200),
    material_type: Faker::Commerce.material,
    color: colors.sample,
    size: [true, false].sample ? sizes.sample : nil
  }

  if category == 'EPI'
    attrs[:approval_certificate] = "CA#{rand(10000..99999)}"
  end

  Material.create!(attrs)
end

puts "✅ Materials successfully created!"
