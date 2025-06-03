class AddColaboradorRefToContatosEmergencia < ActiveRecord::Migration[7.1]
  def change
    add_reference :contato_emergencia, :colaborador, null: false, foreign_key: true
  end
end
