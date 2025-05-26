class AddColunasColaboradors < ActiveRecord::Migration[7.1]
  def change
    change_table :colaboradors do |t|
      t.string  :nome_completo, limit: 100
      t.string  :nome_social, limit: 50
      t.string  :funcao, limit: 50
      t.string  :genero, limit: 20
      t.date    :data_nasc
      t.string  :cor_ou_raca, limit: 30
      t.string  :estado_civil, limit: 20
      t.string  :pais, limit: 50
      t.string  :nacionalidade, limit: 50
      t.string  :situacao, limit: 20
      t.string  :escolaridade, limit: 20
      t.decimal :altura, precision: 4, scale: 2
      t.decimal :peso, precision: 5, scale: 2
    end
  end
end
