class CreateEpis < ActiveRecord::Migration[7.1]
  def change
    create_table :epis do |t|
      t.string :tipo
      t.string :tamanho, limit: 90
      t.references :colaborador, foreign_key: true

      t.timestamps
    end
  end
end
