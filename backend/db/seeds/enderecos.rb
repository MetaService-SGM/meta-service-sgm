puts '🌱 Criando endereços...'

enderecos = [
  {
    ponto_referencia: 'Próximo ao mercado central',
    ponto_encontro: 'Em frente ao mercado central',
    cep: '30140-070',
    uf: 'MG',
    municipio: 'Belo Horizonte',
    bairro: 'Centro',
    logradouro: 'Av. Afonso Pena',
    numero: '1200',
    complemento: 'Apartamento 502',
    colaborador_id: User.first&.id
  },
  {
    ponto_referencia: 'Ao lado da padaria',
    ponto_encontro: 'Em frente a padaria',
    cep: '01001-000',
    uf: 'SP',
    municipio: 'São Paulo',
    bairro: 'Sé',
    logradouro: 'Praça da Sé',
    numero: '100',
    complemento: 'Sala 4',
    colaborador_id: User.second&.id
  },
  {
    ponto_referencia: 'Em frente à praça',
    ponto_encontro: 'Antena de Tv',
    cep: '70040-010',
    uf: 'DF',
    municipio: 'Brasília',
    bairro: 'Asa Sul',
    logradouro: 'SQS 104 Bloco A',
    numero: '10',
    complemento: '',
    colaborador_id: User.third&.id
  },
  {
    ponto_referencia: 'Atrás do supermercado',
    ponto_encontro: 'Em frente ao Supermercado',
    cep: '80010-000',
    uf: 'PR',
    municipio: 'Curitiba',
    bairro: 'Centro',
    logradouro: 'Rua XV de Novembro',
    numero: '800',
    complemento: 'Casa 1',
    colaborador_id: User.fourth&.id
  },
  {
    ponto_referencia: 'Próximo ao hospital municipal',
    ponto_encontro: 'Elevador Lacerda',
    cep: '40020-000',
    uf: 'BA',
    municipio: 'Salvador',
    bairro: 'Barra',
    logradouro: 'Av. Sete de Setembro',
    numero: '700',
    complemento: 'Bloco B, apto 301',
    colaborador_id: User.fifth&.id
  }
]

enderecos.each do |attrs|
  Endereco.create!(attrs)
end

puts '✅ Endereços criados com sucesso!'
