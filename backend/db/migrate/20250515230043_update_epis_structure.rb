class UpdateEpisStructure < ActiveRecord::Migration[7.1]
  def change
    # Remover colunas antigas
    remove_column :epis, :nome, :string
    remove_column :epis, :categoria, :string
    remove_column :epis, :ca, :string
    remove_column :epis, :qtdMinima, :integer
    remove_column :epis, :qtdAtual, :integer

    # Adicionar colunas novas
    add_column :epis, :tamanho, :string, limit: 90
    add_reference :epis, :colaborador, foreign_key: true
  end
end
