class CreateEmpresas < ActiveRecord::Migration[7.1]
  def change
    create_table :empresas do |t|
      t.string :cnpj
      t.string :inscricao_estadual
      t.string :inscricao_municipal
      t.string :razao_social
      t.string :nome_fantasia
      t.string :segmento

      t.timestamps
    end

    add_index :empresas, :cnpj, unique: true
  end
end
