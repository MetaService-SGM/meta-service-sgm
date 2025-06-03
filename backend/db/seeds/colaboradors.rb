puts '🌱 Criando colaboradores...'

Faker::Config.locale = 'pt-BR'

generos = ['Masculino', 'Feminino', 'Não informado']
cores = ['Branca', 'Parda', 'Negra', 'Amarela', 'Vermelha']
estados_civis = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo', "Emancebado"]
situacoes = ['ativo', 'inativo']
escolaridades = Colaborador.escolaridades.keys
funcoes = ['Auxiliar Administrativo', 'Técnico de Segurança', 'Engenheiro', 'Analista de RH', 'Coordenador Técnico']
cbos = ['4110-05', '3516-05', '2149-05', '2524-10', '1236-05']

5.times do
  genero = generos.sample
  nome_completo = Faker::Name.name_with_middle
  nome = nome_completo.split.first
  nome_social = [Faker::Name.first_name, ''].sample
  Colaborador.create!(
    nome: nome,
    nome_completo: nome_completo,
    nome_social: nome_social,
    funcao: funcoes.sample,
    cpf: CPF.generate,
    genero: genero,
    data_nasc: Faker::Date.birthday(min_age: 25, max_age: 60),
    cor_ou_raca: cores.sample,
    estado_civil: estados_civis.sample,
    pais: 'Brasil',
    situacao: situacoes.sample,
    nacionalidade: 'Brasileira',
    cbo: cbos.sample,
    escolaridade: escolaridades.sample,
    altura: rand(1.55..1.90).round(2),
    peso: rand(50.0..95.0).round(1)
  )
end

puts '✅ Colaboradores criados com sucesso!'
