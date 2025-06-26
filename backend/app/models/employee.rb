require 'cpf_cnpj'

class Employee < ApplicationRecord
  has_many :dependents, dependent: :destroy
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :contacts, as: :contactable, dependent: :destroy
  has_many :emergency_contacts, dependent: :destroy
  has_one :employee_contract, dependent: :destroy
  has_many :certifications

  has_one_attached :foto
  
  enum education_level: {
    ensino_fundamental_incompleto: "Ensino Fundamental Incompleto",
    ensino_fundamental_completo: "Ensino Fundamental Completo",
    ensino_medio_incompleto: "Ensino Médio Incompleto",
    ensino_medio_completo: "Ensino Médio Completo",
    ensino_superior_incompleto: "Ensino Superior Incompleto",
    ensino_superior_completo: "Ensino Superior Completo",
    pos_graduacao: "Pós-graduação",
    mestrado: "Mestrado",
    doutorado: "Doutorado"
  }, _prefix: true
  
  def self.ransackable_attributes(auth_object = nil)
    %w[cpf full_name first_name created_at updated_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[addresses contacts]
  end

  validates :cpf, presence: true, uniqueness: true
  validate :cpf_valido

  private

  def cpf_valido
    unless CPF.valid?(cpf)
      errors.add(:cpf, I18n.t("errors.messages.invalid"))
    end
  end
end
