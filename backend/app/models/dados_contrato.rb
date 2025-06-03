class DadosContrato < ApplicationRecord
  belongs_to :colaborador
  belongs_to :cargo
  belongs_to :departamento

  validates :colaborador_id, uniqueness: true 

  validates :tipo_contrato, :unidade, :turno, :moeda, :salario_hora,
            :data_admissao, :periodo_experiencia, :matricula,
            :superior_direto, :grau_hierarquico, :data_contrato,
            :duracao_contrato, :vencimento_contrato, :total_dias,
            :quantidade_horas,
            presence: true

  def self.ransackable_attributes(auth_object = nil)
    %w[tipo_contrato unidade turno moeda salario_hora data_admissao periodo_experiencia matricula
       superior_direto grau_hierarquico data_contrato duracao_contrato vencimento_contrato
       total_dias colaborador_id cargo_id departamento_id quantidade_horas]
  end
end
