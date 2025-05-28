class CreateMaterials < ActiveRecord::Migration[7.1]
  def change
    create_table :materials do |t|
      t.string :nome
      t.string :categoria
      t.string :unidade_medida
      t.float :quantidade_minima
      t.float :quantidade_atual

      t.timestamps
    end
  end
end
