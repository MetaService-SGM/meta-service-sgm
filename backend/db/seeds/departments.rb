puts "👨‍💼 Creating departments..."

departments = %w[
  HumanResources
  Technology
  Marketing
  Finance
  Operations
]

departments.each do |name|
  Department.find_or_create_by!(name: name)
end

puts "✅ Departments created successfully!"
