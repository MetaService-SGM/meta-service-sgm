puts "📦 Criando dados de StockMovements..."

work_orders = WorkOrder.all
materials = Material.all
employees = Employee.all

work_orders.each do |work_order|
  rand(1..3).times do
    StockMovement.create!(
      work_order: work_order,
      material: materials.sample,
      employee_id: employees.sample.id,
      quantity: rand(1..10),
      movement_type: %w[in out].sample,
      moved_at: Faker::Date.between(from: work_order.opened_at, to: Date.today),
      notes: Faker::Lorem.sentence(word_count: 6)
    )
  end
end

puts "✅ StockMovements criados com sucesso!"
