class CreateEpis < ActiveRecord::Migration[7.1]
  def change
    create_table :epis do |t|
      t.string :nome
      t.string :categoria
      t.string :ca
      t.string :tipo
      t.integer :qtdMinima
      t.integer :qtdAtual

      t.timestamps
    end
  end
end
