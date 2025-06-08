class MaterialSerializer
  def self.call(material)
    {
      id: material.id,
      name: material.name,
      category: material.category,
      unit_of_measure: material.unit_of_measure,
      minimum_quantity: material.minimum_quantity,
      current_quantity: material.current_quantity,
      approval_certificate: material.approval_certificate,
      material_type: material.material_type,
      color: material.color,
      size: material.size,
      internal_code: material.internal_code
    }
  end
end
