class CreateContatoEmergencia < ActiveRecord::Migration[7.1]
  def change
    create_table :contato_emergencia do |t|
      t.string :nome
      t.string :telefone
      t.string :parentesco

      t.timestamps
    end
  end
end
