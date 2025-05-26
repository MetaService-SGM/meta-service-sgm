class CargoSerializer
  def self.call(cargo)
    {
      id: cargo.id,
      nome: cargo.nome
    }
  end
end
