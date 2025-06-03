class Dependente < ApplicationRecord
  belongs_to :colaborador
  has_one_attached :documento

  validates :nome, :parentesco, :data_nascimento, presence: true

  def idade
    return unless data_nascimento
    now = Time.zone.now.to_date
    now.year - data_nascimento.year - ((now.month > data_nascimento.month || (now.month == data_nascimento.month && now.day >= data_nascimento.day)) ? 0 : 1)
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[colaborador_id created_at data_nascimento id nome parentesco idade updated_at]
  end  
end
