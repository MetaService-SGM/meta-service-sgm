class CreateContratoGerals < ActiveRecord::Migration[7.1]
  def change
    create_table :contrato_gerals do |t|
      t.string :descricao_servico
      t.string :responsavel
      t.datetime :data_inicio
      t.datetime :data_fim
      t.float :valor
      t.integer :id_prestador
      t.integer :id_cliente
      t.integer :id_servico

      t.timestamps
    end
  end
end
