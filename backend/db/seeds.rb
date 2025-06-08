puts "Iniciando Seed Geral..."

load Rails.root.join('db/seeds/users.rb')
load Rails.root.join('db/seeds/employees.rb')
load Rails.root.join('db/seeds/materials.rb')
load Rails.root.join('db/seeds/providers.rb')
load Rails.root.join("db/seeds/companies.rb")
load Rails.root.join('db/seeds/dependents.rb')
load Rails.root.join('db/seeds/addresses.rb')
load Rails.root.join("db/seeds/contacts.rb")
load Rails.root.join("db/seeds/positions.rb")
load Rails.root.join("db/seeds/departments.rb")
load Rails.root.join("db/seeds/employee_contracts.rb")
load Rails.root.join("db/seeds/emergency_contacts.rb")
load Rails.root.join("db/seeds/certifications.rb")
load Rails.root.join("db/seeds/work_orders.rb")
load Rails.root.join("db/seeds/stock_movements_seed.rb")

puts "Seed finalizada!"
