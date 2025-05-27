puts '🌟 Cadastrando Certificações...'

# Supondo que já existam Colaboradores e Cargos criados

colaborador = Colaborador.first
cargo = Cargo.first

Certificacao.create!([
  {
    nome: 'NR10',
    data_emissao: Date.today - 1.year,
    validade: Date.today + 2.years,
    colaborador_id: colaborador.id,
    cargo_id: cargo.id
  },
  {
    nome: 'NR35',
    data_emissao: Date.today - 2.years,
    validade: Date.today + 1.year,
    colaborador_id: colaborador.id,
    cargo_id: cargo.id
  }
])

puts '✅ Certificações cadastradas!'
