require 'cpf_cnpj'

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  
  devise :database_authenticatable, :registerable, :recoverable,
  :rememberable, :validatable, :lockable
  
  enum role: { admin: 0, gerente: 1, contratado: 2 }
  
  has_one :colaborador, foreign_key: :id, primary_key: :id, dependent: :destroy
  has_many :entregas_epi, foreign_key: :id_colaborador, class_name: "EntregaEpi", dependent: :nullify
  has_many :contratos_colaborador, foreign_key: :id_colaborador, class_name: "ContratoColaborador", dependent: :nullify

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :cpf, presence: true, uniqueness: true, format: { with: /\A\d{11}\z/, message: "deve conter 11 dígitos" }
  validates :role, presence: true
  validate :cpf_valido
  
  private

  def cpf_valido
    unless CPF.valid?(cpf)
      errors.add(:cpf, I18n.t("errors.messages.invalid"))
    end
  end  

  def skip_confirmation!
    self.confirmed_at = Time.current
  end
end
