class ContatoEmergencia < ApplicationRecord
  # Especifica que a tabela associada no banco de dados é "contatos_emergencia"
  self.table_name = "contato_emergencia"
  
  # Associação com o colaborador
  belongs_to :colaborador
  
  # Validações conforme as instruções
  validates :nome, :telefone, :parentesco, presence: true
end
