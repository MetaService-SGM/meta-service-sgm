class AddEpiToEntregaEpi < ActiveRecord::Migration[7.1]
  def change
    add_reference :entrega_epis, :epi, null: false, foreign_key: true
  end
end
