class Contato < ApplicationRecord
  belongs_to :contatoable, polymorphic: true

  enum tipo_telefone: { fixo: 0, movel: 1 }

  validates :telefone, presence: true
  validates :tipo_telefone, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
  validates :operadora, presence: true, if: -> { tipo_telefone == 'movel' }
  validates :departamento, presence: true, if: -> { contatoable_type == 'Empresa' }

  def self.ransackable_attributes(auth_object = nil)
    %w[nome email telefone tipo_telefone operadora contatoable_type contatoable_id]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
