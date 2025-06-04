require 'swagger_helper'

RSpec.describe 'users', type: :request do
  path '/users' do
    get('list users') do
      tags 'Users'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          email: { type: :string },
          role: { type: :string },
          cpf: { type: :string },
          contract_type: { type: :string },
          active: { type: :boolean },
          admin: { type: :boolean }
        }
      }
      response(200, 'successful') do
        run_test!
      end
    end

    post('create user') do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          email: { type: :string },
          role: { type: :string },
          cpf: { type: :string },
          contract_type: { type: :string },
          active: { type: :boolean },
          password: { type: :string }
        },
        required: ['name', 'email', 'password']
      }

      response(201, 'created') do
        let(:user) do
          {
            name: 'João',
            email: 'joao@example.com',
            role: 'admin',
            cpf: '12345678900',
            contract_type: 'CLT',
            active: true,
            password: 'senha123'
          }
        end
        run_test!
      end
    end
  end

  path '/users/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show user') do
      tags 'Users'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update user') do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          role: { type: :string },
          contract_type: { type: :string },
          active: { type: :boolean }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:user) { { name: 'João Atualizado', active: false } }
        run_test!
      end
    end

    delete('delete user') do
      tags 'Users'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
