puts '🌱 Creating positions...'

Position.create!([
  { name: 'Developer' },
  { name: 'Designer' },
  { name: 'Manager' }
])

puts '✅ Positions successfully created!'
