class CreateWorkOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :work_orders do |t|
      t.string :client_order_number
      t.date :opened_at
      t.date :started_at
      t.date :expected_end_at
      t.integer :status, default: 0
      t.integer :priority, default: 1
      t.string :requester_name
      t.string :requester_department
      t.string :requester_contact
      t.string :responsible
      t.text :notes
      t.integer :expected_days
      t.decimal :value, precision: 10, scale: 2

      t.timestamps
    end
  end
end
