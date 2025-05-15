class UpdateEntregaEpisStructure < ActiveRecord::Migration[7.1]
  def change
      # Remover colunas antigas
    remove_column :entrega_epis, :id_epi, :integer
    remove_column :entrega_epis, :id_colaborador, :integer

    # Adicionar nova coluna
    add_column :entrega_epis, :quantidade, :integer

    # Adicionar chaves estrangeiras com references
    add_reference :entrega_epis, :epi, foreign_key: true
    add_reference :entrega_epis, :colaborador, foreign_key: true
  end
end
