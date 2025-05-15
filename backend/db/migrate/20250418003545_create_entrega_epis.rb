class CreateEntregaEpis < ActiveRecord::Migration[7.1]
  def change
    create_table :entrega_epis do |t|
      t.date :data_entrega
      t.integer :quantidade
      t.references :epi, foreign_key: true
      t.references :colaborador, foreign_key: true

      t.timestamps
    end
  end
end
