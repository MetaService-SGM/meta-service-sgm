require 'swagger_helper'

RSpec.describe 'providers', type: :request do
  path '/providers' do
    get('list providers - Lista Todos Fornecedores') do
      tags 'Providers - Fornecedores'
      produces 'application/json'
      response(200, 'successful') do
        run_test!
      end
    end

    post('create provider - Cadastra um Fornecedor') do
      tags 'Providers - Fornecedores'
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

    get('show provider - Mostra detalhes de um Fornecedor') do
      tags 'Providers - Fornecedores'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update provider - Atualiza o Cadastro de um Fornecedor') do
      tags 'Providers - Fornecedores'
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

    delete('delete provider - Exclui um Fornecedor') do
      tags 'Providers - Fornecedores'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
