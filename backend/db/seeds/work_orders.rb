require 'faker'

puts '📋 Criando dados de teste para WorkOrders...'

users = User.all.to_a
materials = Material.all.to_a
employees = Employee.all.to_a

if users.empty?
  puts '⚠️ Nenhum usuário encontrado. Rode a seed de usuários antes.'
  exit
end

if materials.empty?
  puts '⚠️ Nenhum material encontrado. Rode a seed de materiais antes.'
  exit
end

20.times do |i|
  responsible_name = if employees.any? && [true, false].sample
                        employees.sample.full_name
                      else
                        Faker::Name.name
                      end

  work_order = WorkOrder.create!(
    client_order_number: "ORD#{1000 + i}",
    opened_at: Date.current - rand(1..300),
    started_at: Date.current - rand(1..200),
    expected_end_at: Date.current + rand(1..30),
    status: rand(0..2), 
    priority: rand(0..2), 
    requester_name: Faker::Name.name,
    requester_department: "Setor #{(i % 5) + 1}",
    requester_contact: Faker::PhoneNumber.cell_phone_in_e164,
    responsible: responsible_name,
    notes: Faker::Lorem.paragraph(sentence_count: 2),
    expected_days: rand(1..10),
    value: rand(1000.0..5000.0).round(2)
  )

  materials.sample(rand(1..5)).each do |material|
    used_quantity = rand(1..10)
    returned_quantity = [0, used_quantity - rand(0..used_quantity)].sample

    WorkOrderMaterial.create!(
      work_order: work_order,
      material: material,
      quantity: used_quantity,
    )
  end
end

puts '✅ Seeds de WorkOrders concluídas com sucesso.'
