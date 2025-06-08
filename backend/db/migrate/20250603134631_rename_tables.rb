class RenameTables < ActiveRecord::Migration[7.1]
  def change
    rename_table :colaboradors, :employees
    rename_table :cargos, :positions
    rename_table :certificacaos, :certifications
    rename_table :clientes, :clients
    rename_table :contato_emergencia, :emergency_contacts
    rename_table :contatos, :contacts
    rename_table :contrato_gerals, :general_contracts
    rename_table :dados_contratos, :employee_contracts
    rename_table :departamentos, :departments
    rename_table :dependentes, :dependents
    rename_table :empresas, :companies
    rename_table :enderecos, :addresses
    rename_table :material_contratos, :contract_materials
    rename_table :prestadors, :providers
    rename_table :servicos, :services
  end
end
