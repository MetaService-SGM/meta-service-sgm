puts '🌟 Cadastrando Certificações...'

certificacoes_nomes = [
  "NR-10 - Segurança em Instalações Elétricas",
  "NR-30 - Segurança e Saúde no Trabalho Aquaviário",
  "NR-33 - Espaço Confinado",
  "NR-35 - Trabalho em Altura",
  "Transporte de Materiais Químicos",
  "Transporte de Inflamáveis",
  "Primeiros Socorros",
  "Combate a Incêndios",
  "Direção Defensiva",
  "Operação de Empilhadeira",
  "Operação de Ponte Rolante",
  "Operação de Guindaste",
  "Manuseio de Produtos Químicos",
  "CIPA - Comissão Interna de Prevenção de Acidentes",
  "Ergonomia no Trabalho",
  "Uso de EPI",
  "Sinalização de Segurança",
  "Higiene Ocupacional",
  "Atendimento de Emergência",
  "Segurança com Produtos Perigosos"
]

certificacoes = certificacoes_nomes * 2 

colaboradores = Colaborador.all
cargos = Cargo.all

if colaboradores.empty? || cargos.empty?
  puts "⚠️  Nenhum colaborador ou cargo encontrado. Certifique-se de rodar as seeds de colaboradores e cargos primeiro."
else
  certificacoes.each_with_index do |nome, index|
    colaborador = colaboradores.sample
    cargo = cargos.sample
    data_emissao = Faker::Date.between(from: 2.years.ago, to: Date.today)
    validade = data_emissao + [1.year, 2.years, 3.years].sample

    Certificacao.create!(
      nome: nome,
      data_emissao: data_emissao,
      validade: validade,
      colaborador_id: colaborador.id,
      cargo_id: cargo.id
    )
  end

  puts "✅ #{certificacoes.size} certificações criadas com sucesso!"
end
