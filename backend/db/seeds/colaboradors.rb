puts '🌱 Criando colaboradores...'

colaboradores = [
  {
    nome: 'Ana Beatriz',
    nome_completo: 'Ana Beatriz da Silva Souza',
    nome_social: 'Bia Souza',
    funcao: 'Auxiliar Administrativo',
    cpf: '12345678901',
    genero: 'Feminino',
    data_nasc: Date.new(1992, 5, 10),
    cor_ou_raca: 'Parda',
    estado_civil: 'Solteira',
    pais: 'Brasil',
    situacao: 'ativo',
    nacionalidade: 'Brasileira',
    cbo: '4110-05', # Código Brasileiro de Ocupações para auxiliar administrativo
    escolaridade: 'En. Médio Completo',
    altura: 1.65,
    peso: 60.5
  },
  {
    nome: 'Carlos Eduardo',
    nome_completo: 'Carlos Eduardo Moreira',
    nome_social: '',
    funcao: 'Técnico de Segurança',
    cpf: '23456789012',
    genero: 'Masculino',
    data_nasc: Date.new(1985, 9, 22),
    cor_ou_raca: 'Branca',
    estado_civil: 'Casado',
    pais: 'Brasil',
    situacao: 'inativo',
    nacionalidade: 'Brasileira',
    cbo: '3516-05', # Técnico de segurança do trabalho
    escolaridade: 'Superior Completo',
    altura: 1.78,
    peso: 82.0
  },
  {
    nome: 'Juliana Lima',
    nome_completo: 'Juliana Rocha Lima',
    nome_social: 'Ju Lima',
    funcao: 'Engenheira de Segurança',
    cpf: '34567890123',
    genero: 'Feminino',
    data_nasc: Date.new(1989, 3, 15),
    cor_ou_raca: 'Negra',
    estado_civil: 'Solteira',
    pais: 'Brasil',
    situacao: 'ativo',
    nacionalidade: 'Brasileira',
    cbo: '2149-05', # Engenheiro de segurança do trabalho
    escolaridade: 'Pós-graduação',
    altura: 1.70,
    peso: 68.0
  },
  {
    nome: 'Rafael Costa',
    nome_completo: 'Rafael Gomes Costa',
    nome_social: '',
    funcao: 'Analista de RH',
    cpf: '45678901234',
    genero: 'Masculino',
    data_nasc: Date.new(1990, 7, 8),
    cor_ou_raca: 'Branca',
    estado_civil: 'Divorciado',
    pais: 'Brasil',
    situacao: 'inativo',
    nacionalidade: 'Brasileira',
    cbo: '2524-10', # Analista de recursos humanos
    escolaridade: 'Superior Incompleto',
    altura: 1.80,
    peso: 85.0
  },
  {
    nome: 'Fernanda Oliveira',
    nome_completo: 'Fernanda Dias Oliveira',
    nome_social: 'Fer Oliveira',
    funcao: 'Coordenadora Técnica',
    cpf: '56789012345',
    genero: 'Feminino',
    data_nasc: Date.new(1987, 12, 1),
    cor_ou_raca: 'Amarela',
    estado_civil: 'Casada',
    pais: 'Brasil',
    situacao: 'ativo',
    nacionalidade: 'Brasileira',
    cbo: '1236-05', # Coordenador técnico - código fictício
    escolaridade: 'Mestrado',
    altura: 1.68,
    peso: 62.0
  }
]

colaboradores.each do |attrs|
  Colaborador.create!(attrs)
end

puts '✅ Colaboradores criados com sucesso!'
