class CreateWorkOrderEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :work_order_employees do |t|
      t.references :work_order, null: false, foreign_key: true
      t.references :employee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
