puts '🌱 Criando endereços...'

if Colaborador.exists?
  puts "Seeding endereços para colaboradores..."

  Colaborador.limit(5).each do |colaborador|
    begin
      Endereco.create!(
        ponto_referencia: Faker::Address.community,
        ponto_encontro: Faker::Address.street_address,
        cep: Faker::Base.regexify(/\d{5}-?\d{3}/),
        uf: Faker::Address.state_abbr,
        municipio: Faker::Address.city,
        bairro: Faker::Address.community,
        logradouro: Faker::Address.street_name,
        numero: Faker::Address.building_number,
        complemento: Faker::Address.secondary_address,
        enderecoable: colaborador
      )
    rescue => e
      puts "Erro ao criar endereço para Colaborador ID #{colaborador.id}: #{e.message}"
    end
  end

  puts "✅ Endereços para colaboradores criados!"
else
  puts "⚠️ Nenhum colaborador encontrado. Pulei essa parte da seed."
end

if Empresa.exists?
  puts "Seeding endereços para empresas..."

  Empresa.limit(5).each do |empresa|
    begin
      Endereco.create!(
        ponto_referencia: Faker::Address.community,
        cep: Faker::Base.regexify(/\d{5}-?\d{3}/),
        uf: Faker::Address.state_abbr,
        municipio: Faker::Address.city,
        bairro: Faker::Address.community,
        logradouro: Faker::Address.street_name,
        numero: Faker::Address.building_number,
        complemento: Faker::Address.secondary_address,
        enderecoable: empresa
      )
    rescue => e
      puts "Erro ao criar endereço para Empresa ID #{empresa.id}: #{e.message}"
    end
  end

  puts "✅ Endereços para empresas criados!"
else
  puts "⚠️ Nenhuma empresa encontrada. Pulei essa parte da seed."
end

puts '✅ Finalizado o seeding de endereços!'
