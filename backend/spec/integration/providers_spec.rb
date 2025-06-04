require 'swagger_helper'

RSpec.describe 'providers', type: :request do
  path '/providers' do
    get('list providers') do
      tags 'Providers'
      produces 'application/json'
      response(200, 'successful') do
        run_test!
      end
    end

    post('create provider') do
      tags 'Providers'
      consumes 'application/json'
      parameter name: :provider, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          cnpj: { type: :string },
          address: { type: :string },
          phone: { type: :string },
          email: { type: :string }
        }
      }

      response(201, 'created') do
        let(:provider) { { name: 'Fornecedor XYZ', cnpj: '12345678000199' } }
        run_test!
      end
    end
  end

  path '/providers/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show provider') do
      tags 'Providers'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update provider') do
      tags 'Providers'
      consumes 'application/json'
      parameter name: :provider, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:provider) { { email: 'novo@email.com' } }
        run_test!
      end
    end

    delete('delete provider') do
      tags 'Providers'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
