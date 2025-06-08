class CreateAsos < ActiveRecord::Migration[7.1]
  def change
    create_table :asos do |t|
      t.boolean :apto_para_atividade
      t.date :data_emissao
      t.date :validade
      t.references :dados_contratos, null: false, foreign_key: true

      t.timestamps
    end
  end
end
