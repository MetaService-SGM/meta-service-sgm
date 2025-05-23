class Contato < ApplicationRecord
  belongs_to :contatoable, polymorphic: true

  validates :numero, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
end
