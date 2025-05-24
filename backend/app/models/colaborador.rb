require 'cpf_cnpj'

class Colaborador < ApplicationRecord
  has_many :contrato_colaboradors, dependent: :destroy
  has_many :entrega_epis, dependent: :destroy
  has_many :dependentes, dependent: :destroy
  has_many :enderecos, as: :enderecoable, dependent: :destroy
  has_many :contatos, as: :contatoable, dependent: :destroy
    
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
