class CreateAlerts < ActiveRecord::Migration[7.1]
  def change
    create_table :alerts do |t|
      t.string :category
      t.string :message
      t.boolean :resolved, default: false
      t.string :reference_type
      t.integer :reference_id

      t.timestamps
    end
  end
end
