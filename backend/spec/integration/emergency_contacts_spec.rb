require 'swagger_helper'

RSpec.describe 'emergency_contacts', type: :request do
  path '/emergency_contacts' do
    get('list emergency contacts - Lista todos os cadastros dos Contatos de Emergência') do
      tags 'EmergencyContacts - Contatos de Emergência'
      produces 'application/json'
      response(200, 'successful') do
        run_test!
      end
    end

    post('create emergency contact - Cadastra um Contato de Emergência') do
      tags 'EmergencyContacts - Contatos de Emergência'
      consumes 'application/json'
      parameter name: :emergency_contact, in: :body, schema: {
        type: :object,
        properties: {
          full_name: { type: :string },
          phone: { type: :string },
          kinship: { type: :string },
          employee_id: { type: :integer },
          carrier: { type: :string }
        },
        required: ['full_name', 'phone', 'kinship', 'employee_id']
      }

      response(201, 'created') do
        let(:emergency_contact) do
          {
            full_name: 'Maria Silva',
            phone: '11999998888',
            kinship: 'Mãe',
            employee_id: 1,
            carrier: 'Claro'
          }
        end
        run_test!
      end
    end
  end

  path '/emergency_contacts/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show emergency contact - Mostra detalhes de um Contato de Emergência') do
      tags 'EmergencyContacts - Contatos de Emergência'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update emergency contact - Atualiza o cadastro de um Contato de Emergência') do
      tags 'EmergencyContacts - Contatos de Emergência'
      consumes 'application/json'
      parameter name: :emergency_contact, in: :body, schema: {
        type: :object,
        properties: {
          phone: { type: :string },
          carrier: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:emergency_contact) { { phone: '11988887777' } }
        run_test!
      end
    end

    delete('delete emergency contact - Exclui o cadastro de um Contato de Emergência') do
      tags 'EmergencyContacts - Contatos de Emergência'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
