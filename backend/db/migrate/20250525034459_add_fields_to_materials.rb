class AddFieldsToMaterials < ActiveRecord::Migration[7.1]
  def change
    add_column :materials, :certif_aprov, :string
    add_column :materials, :tipo, :string
    add_column :materials, :cor, :string
    add_column :materials, :tamanho, :string
    add_column :materials, :cod_int, :integer

    add_index :materials, :cod_int, unique: true
  end
end
