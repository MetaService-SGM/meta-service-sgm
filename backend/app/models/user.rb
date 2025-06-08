require 'cpf_cnpj'

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  
  devise :database_authenticatable, :registerable, :recoverable,
  :rememberable, :validatable, :lockable
  
  enum role: { admin: 0, gerente: 1, contratado: 2 }
  
  has_one :employee, foreign_key: :id, primary_key: :id, dependent: :destroy
  has_many :employee_contracts, foreign_key: :employee_id, dependent: :nullify

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :cpf, presence: true, uniqueness: true, format: { with: /\A\d{11}\z/, message: "deve conter 11 dígitos" }
  validates :role, presence: true
  validate :cpf_valido
  
  def self.ransackable_attributes(auth_object = nil)
    %w[
      name email role cpf contract_type active admin
    ]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end

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
