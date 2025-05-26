class RemoveColaboradorIdFromEnderecos < ActiveRecord::Migration[7.1]
  def change
    remove_column :enderecos, :colaborador_id, :bigint
  end
end
