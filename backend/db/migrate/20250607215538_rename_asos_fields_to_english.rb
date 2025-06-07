class RenameAsosFieldsToEnglish < ActiveRecord::Migration[7.1]
  def change
    rename_column :asos, :apto_para_atividade, :fit_for_activity
    rename_column :asos, :data_emissao, :issued_at
    rename_column :asos, :validade, :expires_at

    remove_reference :asos, :dados_contratos
    add_reference :asos, :employee_contracts, null: false, foreign_key: true  
  end
end
