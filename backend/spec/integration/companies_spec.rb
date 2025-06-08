require 'swagger_helper'

RSpec.describe 'companies', type: :request do
  path '/companies' do
    get 'List companies with filters - Lista Todas as Empresas (com ou sem filtro)' do
      tags 'Companies - Empresas'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          state_registration_eq: { type: :string },
          municipal_registration_eq: { type: :string },
          corporate_name_cont: { type: :string },
          trade_name_cont: { type: :string },
          business_segment_cont: { type: :string }
        }
      }

      response '200', 'companies filtered' do
        schema type: :array, items: { type: :object }
        run_test!
      end
    end

    post('create company - Cadastra uma Empresa') do
      tags 'Companies - Empresas'
      consumes 'application/json'
      parameter name: :company, in: :body, schema: {
        type: :object,
        properties: {
          cnpj: { type: :string },
          state_registration: { type: :string },
          municipal_registration: { type: :string },
          corporate_name: { type: :string },
          trade_name: { type: :string },
          business_segment: { type: :string }
        },
        required: ['cnpj', 'corporate_name']
      }

      response(201, 'created') do
        let(:company) do
          {
            cnpj: '12345678000100',
            state_registration: '12345678',
            municipal_registration: '87654321',
            corporate_name: 'Empresa Exemplo S/A',
            trade_name: 'Exemplo',
            business_segment: 'Tecnologia'
          }
        end
        run_test!
      end
    end
  end

  path '/companies/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show company - Mostra detalhes de uma Empresa') do
      tags 'Companies - Empresas'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update company - Atualiza o cadastro de uma Empresa') do
      tags 'Companies - Empresas'
      consumes 'application/json'
      parameter name: :company, in: :body, schema: {
        type: :object,
        properties: {
          trade_name: { type: :string },
          business_segment: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:company) { { trade_name: 'Exemplo Atualizado' } }
        run_test!
      end
    end

    delete('delete company - Exclui o cadastro de uma Empresa') do
      tags 'Companies - Empresas'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
