# db/seeds.rb

puts "Iniciando Seed Geral..."

load Rails.root.join('db/seeds/users.rb')
load Rails.root.join('db/seeds/materials.rb')
load Rails.root.join('db/seeds/prestadors.rb')

puts "Seed finalizada!"
