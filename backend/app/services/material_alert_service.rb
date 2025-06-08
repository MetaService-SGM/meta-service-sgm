class MaterialAlertService
  def self.call
    Material.where('current_quantity <= minimum_quantity').find_each do |material|
      next if Alert.exists?(category: 'material', reference_type: 'Material', reference_id: material.id, resolved: false)

      Alert.create!(
        category: 'material',
        message: "Material '#{material.name}' está abaixo do mínimo (#{material.current_quantity}/#{material.minimum_quantity}).",
        reference_type: 'Material',
        reference_id: material.id
      )
    end
  end
end
