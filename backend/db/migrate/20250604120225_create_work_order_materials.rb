class CreateWorkOrderMaterials < ActiveRecord::Migration[7.1]
  def change
    create_table :work_order_materials do |t|
      t.references :work_order, null: false, foreign_key: true
      t.references :material, null: false, foreign_key: true
      t.float :quantity
      t.float :returned_quantity, default: 0.0, null: false

      t.timestamps
    end
  end
end
