class DepartmentSerializer
  def self.call(department)
    {
      id: department.id,
      name: department.name
    }
  end
end
