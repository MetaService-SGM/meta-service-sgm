class CreateColaboradors < ActiveRecord::Migration[7.1]
  def change
    create_table :colaboradors do |t|
      t.string :nome
      t.string :cpf
      t.string :cbo

      t.timestamps
    end
  end
end
