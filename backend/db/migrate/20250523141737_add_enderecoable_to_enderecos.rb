class AddEnderecoableToEnderecos < ActiveRecord::Migration[7.1]
  def change
    add_reference :enderecos, :enderecoable, polymorphic: true, null: false
  end
end
