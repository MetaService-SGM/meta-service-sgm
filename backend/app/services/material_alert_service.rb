class MaterialAlertService
  def self.call
    Alert.where(resolved: true)
         .where("created_at < ?", 30.days.ago)
         .delete_all

    Material.where('current_quantity <= minimum_quantity').find_each do |material|
      next if Alert.exists?(
        category: 'material',
        reference_type: 'Material',
        reference_id: material.id,
        resolved: false
      )

      next if Alert.exists?(
        category: 'material',
        reference_type: 'Material',
        reference_id: material.id,
        resolved: true
      )

      Alert.create!(
        category: 'material',
        message: "Material '#{material.name}' está abaixo do mínimo (#{material.current_quantity}/#{material.minimum_quantity}).",
        reference_type: 'Material',
        reference_id: material.id
      )
    end
  end
end
