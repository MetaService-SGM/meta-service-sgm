require 'cpf_cnpj'

class Colaborador < ApplicationRecord
    has_many :contrato_colaboradors, dependent: :destroy
    has_many :entrega_epis, dependent: :destroy
    has_many :dependentes, dependent: :destroy
    
  validates :cpf, presence: true, uniqueness: true
  validate :cpf_valido

  private

  def cpf_valido
    unless CPF.valid?(cpf)
      errors.add(:cpf, I18n.t("errors.messages.invalid"))
    end
  end
end
