class CreateContatos < ActiveRecord::Migration[7.1]
  def change
    create_table :contatos do |t|
      t.string :numero
      t.string :email
      t.string :whatsapp
      t.string :telegram
      t.string :signal
      t.references :contatoable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
