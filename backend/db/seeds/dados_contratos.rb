puts "🔧 Gerando dados contratuais..."

Faker::Config.locale = 'pt-BR'

colaboradores = Colaborador.limit(5)
cargos = Cargo.all.to_a
departamentos = Departamento.all.to_a

colaboradores.each do |colaborador|
  DadosContrato.create!(
    tipo_contrato: 'CLT',
    unidade: 'Unidade Central',
    turno: 'Diurno',
    moeda: 'BRL',
    salario_hora: rand(19.0..50.0).round(2),
    data_admissao: Date.today - 365,
    periodo_experiencia: 90,
    matricula: SecureRandom.hex(4),
    superior_direto: Faker::Name.name,
    grau_hierarquico: ['Júnior', 'Pleno', 'Sênior'].sample,
    data_contrato: Date.today - 365,
    duracao_contrato: 730,
    vencimento_contrato: Date.today + 365,
    total_dias: 730,
    quantidade_horas: 44,
    colaborador_id: colaborador.id,
    cargo_id: cargos.sample&.id,
    departamento_id: departamentos.sample&.id
  )
end

puts "✅ Dados contratuais gerados com sucesso!"
