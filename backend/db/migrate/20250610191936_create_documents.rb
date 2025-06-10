class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.string :tipo
      t.string :numero
      t.string :orgao_emissor
      t.date :data_emissao
      t.references :employee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
