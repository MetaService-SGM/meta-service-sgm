require 'swagger_helper'

RSpec.describe 'positions', type: :request do
  path '/positions' do
    get('list positions') do
      tags 'Positions'
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

    post('create position') do
      tags 'Positions'
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

    get('show position') do
      tags 'Positions'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update position') do
      tags 'Positions'
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

    delete('delete position') do
      tags 'Positions'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
