require 'cpf_cnpj'

class Colaborador < ApplicationRecord
  has_many :contrato_colaboradors, dependent: :destroy
  has_many :entrega_epis, dependent: :destroy
  has_many :dependentes, dependent: :destroy
  has_many :enderecos, as: :enderecoable, dependent: :destroy
  has_many :contatos, as: :contatoable, dependent: :destroy
  has_many :contatos_emergencia, dependent: :destroy
  has_one :dados_contrato, dependent: :destroy

  has_one_attached :foto
  
  enum escolaridade: {
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
    %w[cpf nome created_at updated_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[enderecos contatos]
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
