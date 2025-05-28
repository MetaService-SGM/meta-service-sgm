class AddColunasContratoColaboradors < ActiveRecord::Migration[7.1]
  def change

    change_table :contrato_colaboradors do |t|
      t.string  :tipo_contrato, limit: 20
      t.string  :unidade, limit: 100
      t.string  :turno, limit: 50
      t.string  :moeda, limit: 15
      t.decimal :salario, precision: 10, scale: 2
      t.date    :data_admissao
      t.integer :periodo_experiencia
      t.string  :matricula, null: false, limit: 20
      t.string  :superior_direto, limit: 100
      t.string  :grau_hierarquico, limit: 50
      t.date    :data_contrato
      t.integer :duracao_contrato
      t.date    :vencimento_contrato
      t.integer :total_dias
      
    end
      
      add_foreign_key :contrato_colaboradors, :colaboradors, column: :id_colaborador

  end
end
