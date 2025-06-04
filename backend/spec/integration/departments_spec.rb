require 'swagger_helper'

RSpec.describe 'departments', type: :request do
  path '/departments' do
    get 'List departments with filters' do
      tags 'Departments'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          name_cont: { type: :string }
        }
      }

      response '200', 'departments filtered' do
        schema type: :array, items: { type: :object }
        run_test!
      end
    end

    post('create department') do
      tags 'Departments'
      consumes 'application/json'
      parameter name: :department, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        },
        required: ['name']
      }

      response(201, 'created') do
        let(:department) { { name: 'Recursos Humanos' } }
        run_test!
      end
    end
  end

  path '/departments/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show department') do
      tags 'Departments'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update department') do
      tags 'Departments'
      consumes 'application/json'
      parameter name: :department, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:department) { { name: 'Financeiro' } }
        run_test!
      end
    end

    delete('delete department') do
      tags 'Departments'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
