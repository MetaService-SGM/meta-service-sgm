class Contato < ApplicationRecord
  belongs_to :contatoable, polymorphic: true

  validates :numero, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true


  def self.ransackable_attributes(auth_object = nil)
    %w[nome email telefone contatoable_type contatoable_id]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
