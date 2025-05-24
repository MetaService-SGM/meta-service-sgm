puts "🔧 Gerando dados contratuais..."

colaboradores = Colaborador.limit(5)
cargos = Cargo.all
departamentos = Departamento.all 

colaboradores.each do |colaborador|
  DadosContrato.create!(
    tipo_contrato: 'CLT',
    unidade: 'Unidade Central',
    turno: 'Diurno',
    moeda: 'BRL',
    salario: rand(2500.0..5000.0).round(2),
    data_admissao: Date.today - 365,
    periodo_experiencia: 90,
    matricula: SecureRandom.hex(4),
    superior_direto: Faker::Name.first_name,
    grau_hierarquico: ['Júnior', 'Pleno', 'Sênior'].sample,
    data_contrato: Date.today - 365,
    duracao_contrato: 730,
    vencimento_contrato: Date.today + 365,
    total_dias: 730,
    colaborador_id: colaborador.id,
    cargo_id: cargos.sample.id,
    departamento_id: departamentos.sample.id 
  )
end

puts "✅ Dados contratuais gerados com sucesso!"
