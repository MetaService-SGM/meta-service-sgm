class CreateStockMovements < ActiveRecord::Migration[7.1]
  def change
    create_table :stock_movements do |t|
      t.references :material, null: false, foreign_key: true
      t.references :work_order, null: false, foreign_key: true
      t.integer :movement_type
      t.float :quantity
      t.datetime :moved_at
      t.references :employee, null: false, foreign_key: true
      t.text :notes
      t.references :approver, foreign_key: { to_table: :users }, null: true
      t.references :rollback_from, foreign_key: { to_table: :stock_movements }, null: true

      t.timestamps
    end
  end
end
