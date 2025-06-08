class Company < ApplicationRecord
  has_many :addresses, as: :addressable, dependent: :destroy
  has_many :contacts, as: :contactable, dependent: :destroy

  validates :cnpj, presence: true, uniqueness: true
  validates :state_registration, :municipal_registration, :corporate_name, :trade_name, :business_segment, presence: true
  validate :cnpj_valido

  def self.ransackable_attributes(auth_object = nil)
    %w[ state_registration municipal_registration corporate_name trade_name business_segment ]
  end

  def self.ransackable_associations(auth_object = nil)
    has_many :addresses, as: :addressable, dependent: :destroy
    has_many :contacts, as: :contactable, dependent: :destroy
  end
  
  private

  def cnpj_valido
    unless CNPJ.valid?(cnpj)
      errors.add(:cnpj, I18n.t("errors.messages.invalid"))
    end
  end
end
