class FixEmployeeContractReferenceInAsos < ActiveRecord::Migration[7.1]
  def change
    remove_reference :asos, :employee_contracts
    add_reference :asos, :employee_contract, null: false, foreign_key: true
  end
end
