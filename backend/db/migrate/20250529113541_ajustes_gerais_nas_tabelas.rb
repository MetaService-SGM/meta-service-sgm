class AjustesGeraisNasTabelas < ActiveRecord::Migration[7.1]
  def change
    change_column :colaboradors, :escolaridade, :string, limit: 30
    
    rename_column :contatos, :numero, :telefone
    add_column :contatos, :tipo_telefone, :integer, using: 'tipo_telefone::integer'
    add_column :contatos, :departamento, :string
    add_column :contatos, :operadora, :string

    add_column :contato_emergencia, :operadora, :string

    remove_column :enderecos, :ponto_encontro, :string
    remove_column :enderecos, :ponto_referencia, :string

    rename_column :dados_contratos, :salario, :salario_hora
    add_column :dados_contratos, :data_inicio, :datetime
    add_column :dados_contratos, :data_fim, :datetime
    add_column :dados_contratos, :quantidade_horas, :float

    drop_table :entrega_epis, if_exists: true
    drop_table :epis, if_exists: true

    drop_table :contrato_colaboradors, if_exists: true
  end
end
