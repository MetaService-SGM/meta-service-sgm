class CreateMaterialContratos < ActiveRecord::Migration[7.1]
  def change
    create_table :material_contratos do |t|
      t.float :quantidade_solicitada
      t.float :quantidade_utilizada
      t.float :quantidade_devolvida
      t.datetime :data_entrega
      t.datetime :data_devolucao
      t.string :observacao
      t.integer :id_contrato_geral
      t.integer :id_material

      t.timestamps
    end
  end
end
