class MaterialSerializer
  def self.call(material)
    {
      id: material.id,
      nome: material.nome,
      categoria: material.categoria,
      unidade_medida: material.unidade_medida,
      quantidade_minima: material.quantidade_minima,
      quantidade_atual: material.quantidade_atual,
      certif_aprov: material.certif_aprov,
      tipo: material.tipo,
      cor: material.cor,
      tamanho: material.tamanho,
      cod_int: material.cod_int
    }
  end
end
