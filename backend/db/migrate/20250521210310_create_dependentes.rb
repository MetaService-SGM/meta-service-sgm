class CreateDependentes < ActiveRecord::Migration[7.1]
  def change
    create_table :dependentes do |t|
      t.string :nome
      t.string :parentesco
      t.date :data_nascimento
      t.references :colaborador, null: false, foreign_key: true

      t.timestamps
    end
  end
end
