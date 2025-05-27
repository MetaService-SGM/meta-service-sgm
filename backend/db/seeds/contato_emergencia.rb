require 'faker'

colaboradores = Colaborador.all

5.times do
  ContatoEmergencia.create!(
    nome: Faker::Name.name,
    telefone: Faker::PhoneNumber.cell_phone_in_e164,
    parentesco: Faker::Relationship.familial,
    colaborador: colaboradores.sample # pega um colaborador aleatório
  )
end
