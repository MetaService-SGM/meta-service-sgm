class ContratoColaborador < ApplicationRecord
   belongs_to :colaborador, foreign_key: :id_colaborador
   #belongs_to :contrato_geral, foreign_key: :id_contrato_geral
  end
