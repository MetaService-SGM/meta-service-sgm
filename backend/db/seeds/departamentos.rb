puts "👨‍💼 Criando departamentos..."

departamentos = %w[
  RecursosHumanos
  Tecnologia
  Marketing
  Financeiro
  Operações
]

departamentos.each do |nome|
  Departamento.find_or_create_by!(nome: nome)
end

puts "✅ Departamentos criados com sucesso!"
