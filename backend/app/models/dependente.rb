class Dependente < ApplicationRecord
  belongs_to :colaborador
  has_one_attached :documento

  validates :nome, :parentesco, :data_nascimento, presence: true

  def self.ransackable_attributes(auth_object = nil)
    %w[colaborador_id created_at data_nascimento id nome parentesco updated_at]
  end  
end
