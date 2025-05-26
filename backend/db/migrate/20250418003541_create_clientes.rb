class CreateClientes < ActiveRecord::Migration[7.1]
  def change
    create_table :clientes do |t|
      t.string :nome
      t.string :cnpj
      t.string :endereco
      t.string :telefone
      t.string :email

      t.timestamps
    end
  end
end
