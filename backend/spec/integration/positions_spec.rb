require 'swagger_helper'

RSpec.describe 'positions', type: :request do
  path '/positions' do
    get('list positions - Lista todos os Cargos (com ou sem filtro)') do
      tags 'Positions - Cargos'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        }
      }
      response(200, 'successful') do
        run_test!
      end
    end

    post('create position - Cadastra um Cargo') do
      tags 'Positions - Cargos'
      consumes 'application/json'
      parameter name: :position, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        },
        required: ['name']
      }

      response(201, 'created') do
        let(:position) { { name: 'Analista de Sistemas' } }
        run_test!
      end
    end
  end

  path '/positions/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show position - Mostra detalhes de um Cargo') do
      tags 'Positions - Cargos'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update position - Atualiza o cadastro de um Cargo') do
      tags 'Positions - Cargos'
      consumes 'application/json'
      parameter name: :position, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:position) { { name: 'Desenvolvedor' } }
        run_test!
      end
    end

    delete('delete position - Exclui o cadastro de um Cargo') do
      tags 'Positions - Cargos'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
