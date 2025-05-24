class DepartamentoSerializer
  def self.call(departamento)
    {
      id: departamento.id,
      nome: departamento.nome
    }
  end
end
