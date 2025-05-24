class DadosContratoSerializer
  def self.call(obj)
    {
      id: obj.id,
      tipo_contrato: obj.tipo_contrato,
      unidade: obj.unidade,
      turno: obj.turno,
      moeda: obj.moeda,
      salario: obj.salario,
      data_admissao: obj.data_admissao,
      periodo_experiencia: obj.periodo_experiencia,
      matricula: obj.matricula,
      superior_direto: obj.superior_direto,
      grau_hierarquico: obj.grau_hierarquico,
      data_contrato: obj.data_contrato,
      duracao_contrato: obj.duracao_contrato,
      vencimento_contrato: obj.vencimento_contrato,
      total_dias: obj.total_dias,
      colaborador_id: obj.colaborador_id,
      cargo_id: obj.cargo_id,
      departamento_id: obj.departamento_id
    }
  end
end
