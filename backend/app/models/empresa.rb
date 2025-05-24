class Empresa < ApplicationRecord
  has_many :enderecos, as: :enderecoable, dependent: :destroy
  has_many :contatos, as: :contatavel, dependent: :destroy

  validates :cnpj, presence: true, uniqueness: true
  validates :inscricao_estadual, :inscricao_municipal, :razao_social, :nome_fantasia, :segmento, presence: true
  validate :cnpj_valido

  def self.ransackable_attributes(auth_object = nil)
    %w[cnpj inscricao_estadual inscricao_municipal razao_social nome_fantasia segmento]
  end

  def self.ransackable_associations(auth_object = nil)
    has_many :enderecos, as: :enderecoable, dependent: :destroy
    has_many :contatos, as: :contatoable, dependent: :destroy
  end
  
  private

  def cnpj_valido
    unless CNPJ.valid?(cnpj)
      errors.add(:cnpj, I18n.t("errors.messages.invalid"))
    end
  end
end
