class CreateDadosContratos < ActiveRecord::Migration[7.1]
  def change
    create_table :dados_contratos do |t|
      t.string :tipo_contrato
      t.string :unidade
      t.string :turno
      t.string :moeda
      t.decimal :salario, precision: 10, scale: 2
      t.date :data_admissao
      t.integer :periodo_experiencia
      t.string :matricula
      t.string :superior_direto
      t.string :grau_hierarquico
      t.date :data_contrato
      t.integer :duracao_contrato
      t.date :vencimento_contrato
      t.integer :total_dias
      t.references :colaborador, null: false, foreign_key: true
      t.references :cargo, null: false, foreign_key: true
      t.references :departamento, null: false, foreign_key: true

      t.timestamps
    end
  end
end
