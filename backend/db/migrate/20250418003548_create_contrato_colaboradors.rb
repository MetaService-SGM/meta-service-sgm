class CreateContratoColaboradors < ActiveRecord::Migration[7.1]
  def change
    create_table :contrato_colaboradors do |t|
      t.datetime :data_inicio
      t.datetime :data_fim
      t.float :quantidade_horas
      t.float :valor_hora
      t.integer :id_contrato_geral
      t.integer :id_colaborador

      t.timestamps
    end
  end
end
