class CreateCertificacaos < ActiveRecord::Migration[7.1]
  def change
    create_table :certificacaos, if_not_exists: true do |t|
      t.string :nome, limit: 100
      t.date :data_emissao
      t.date :validade
      t.references :colaborador, null: false, foreign_key: true
      t.references :cargo, null: false, foreign_key: true

      t.timestamps
    end
  end
end
