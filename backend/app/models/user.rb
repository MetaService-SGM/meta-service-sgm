class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  
  devise :database_authenticatable, :registerable, :recoverable,
  :rememberable, :validatable, :lockable
  
  enum role: { admin: 0, gerente: 1, contratado: 2 }
  
  has_one :colaborador, foreign_key: :id, primary_key: :id, dependent: :destroy
  has_many :entregas_epi, foreign_key: :id_colaborador, class_name: "EntregaEpi", dependent: :nullify
  has_many :contratos_colaborador, foreign_key: :id_colaborador, class_name: "ContratoColaborador", dependent: :nullify

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :cpf, format: { with: /\A\d{11}\z/, message: "deve conter 11 dígitos" }, allow_blank: true
  validates :role, presence: true

  private

  def skip_confirmation!
    self.confirmed_at = Time.current
  end
end
