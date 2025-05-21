# db/seeds.rb

puts "Iniciando Seed Geral..."

load Rails.root.join('db/seeds/users.rb')
load Rails.root.join('db/seeds/colaboradors.rb')
load Rails.root.join('db/seeds/materials.rb')
load Rails.root.join('db/seeds/prestadors.rb')
load Rails.root.join('db/seeds/enderecos.rb')

puts "Seed finalizada!"
