require 'swagger_helper'

RSpec.describe 'contacts', type: :request do
  path '/contacts' do
    get 'List contacts with filters - Lista todos os contatos (com ou sem filtro)' do
      tags 'Contacts - Contatos'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          email_cont: { type: :string },
          phone_cont: { type: :string },
          phone_type_eq: { type: :string },
          carrier_eq: { type: :string },
          contactable_type_eq: { type: :string },
          contactable_id_eq: { type: :integer }
        }
      }

      response '200', 'contacts filtered' do
        schema type: :array, items: { type: :object }
        run_test!
      end
    end

    post('create contact - Cadastra um contato') do
      tags 'Contacts - Contatos'
      consumes 'application/json'
      parameter name: :contact, in: :body, schema: {
        type: :object,
        properties: {
          phone: { type: :string },
          email: { type: :string },
          whatsapp: { type: :string },
          telegram: { type: :string },
          signal: { type: :string },
          contactable_type: { type: :string },
          contactable_id: { type: :integer },
          phone_type: { type: :string },
          department: { type: :string },
          carrier: { type: :string }
        },
        required: ['phone', 'contactable_type', 'contactable_id']
      }

      response(201, 'created') do
        let(:contact) do
          {
            phone: '11999999999',
            email: 'contato@example.com',
            whatsapp: '11999999999',
            contactable_type: 'Employee',
            contactable_id: 1,
            phone_type: 'móvel',
            department: 'RH',
            carrier: 'Vivo'
          }
        end
        run_test!
      end
    end
  end

  path '/contacts/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show contact - Mostra detalhes de um Contato') do
      tags 'Contacts - Contatos'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update contact - Atualiza o cadastro de um Contato') do
      tags 'Contacts - Contatos'
      consumes 'application/json'
      parameter name: :contact, in: :body, schema: {
        type: :object,
        properties: {
          phone: { type: :string },
          email: { type: :string },
          whatsapp: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:contact) { { phone: '11988888888' } }
        run_test!
      end
    end

    delete('delete contact - Excluio cadastro de um Contato') do
      tags 'Contacts - Contatos'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
