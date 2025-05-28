class AddUniqueIndexesToUsersAndColaboradores < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :email, unique: true
    add_index :users, :cpf, unique: true

    add_index :colaboradors, :cpf, unique: true
  end
end
