class CreateEntregaEpis < ActiveRecord::Migration[7.1]
  def change
    create_table :entrega_epis do |t|
      t.datetime :data_entrega
      t.datetime :data_devolucao
      t.string :observacao
      t.integer :id_epi
      t.integer :id_colaborador

      t.timestamps
    end
  end
end
