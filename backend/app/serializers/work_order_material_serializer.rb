class WorkOrderMaterialSerializer
  def self.call(wom)
    {
      id: wom.id,
      material_id: wom.material_id,
      material_name: wom.material.name,
      quantity: wom.quantity,
      returned_quantity: wom.returned_quantity
    }
  end
end
