require 'swagger_helper'

RSpec.describe 'dependents', type: :request do
  path '/dependents' do
    get 'List dependents with filters - Lista todos os cadastros dos Dependentes (com ou sem filtro)' do
      tags 'Dependents - Dependentes'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          employee_id_eq: { type: :integer },
          created_at_gteq: { type: :string, format: 'date-time' },
          birth_date_eq: { type: :string, format: 'date' },
          full_name_cont: { type: :string },
          kinship_eq: { type: :string }
        }
      }

      response '200', 'dependents filtered' do
        schema type: :array, items: { type: :object }
        run_test!
      end
    end

    post('create dependent - Cadastra um Dependente') do
      tags 'Dependents - Dependentes'
      consumes 'application/json'
      parameter name: :dependent, in: :body, schema: {
        type: :object,
        properties: {
          full_name: { type: :string },
          kinship: { type: :string },
          birth_date: { type: :string, format: :date },
          employee_id: { type: :integer }
        },
        required: ['full_name', 'employee_id']
      }

      response(201, 'created') do
        let(:dependent) do
          {
            full_name: 'Maria da Silva',
            kinship: 'filha',
            birth_date: '2015-08-10',
            employee_id: 1
          }
        end
        run_test!
      end
    end
  end

  path '/dependents/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show dependent - Mostra detalhes de um Dependente') do
      tags 'Dependents - Dependentes'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update dependent - Atualiza o casdastro de um Dependente') do
      tags 'Dependents - Dependentes'
      consumes 'application/json'
      parameter name: :dependent, in: :body, schema: {
        type: :object,
        properties: {
          full_name: { type: :string },
          kinship: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:dependent) { { full_name: 'Maria Silva Atualizada' } }
        run_test!
      end
    end

    delete('delete dependent - Exclui o cadastro de um Dependente') do
      tags 'Dependents - Dependentes'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
