class CreateEnderecos < ActiveRecord::Migration[7.1]
  def change
    create_table :enderecos do |t|
      t.string :ponto_referencia
      t.string :ponto_encontro
      t.string :cep
      t.string :uf
      t.string :municipio
      t.string :bairro
      t.string :logradouro
      t.string :numero
      t.string :complemento
      t.references :colaborador, null: false, foreign_key: true

      t.timestamps
    end
  end
end
