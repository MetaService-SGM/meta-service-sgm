require 'swagger_helper'

RSpec.describe 'addresses', type: :request do
  path '/addresses' do
    get 'List addresses with filters - Lista todos endereços (com ou sem filtro)' do
      tags 'Addresses - Endereços'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          zip_code_cont: { type: :string },
          state_cont: { type: :string },
          city_cont: { type: :string },
          district_cont: { type: :string },
          street_cont: { type: :string },
          number_eq: { type: :string },
          complement_cont: { type: :string },
          meeting_point_cont: { type: :string },
          landmark_cont: { type: :string },
          addressable_type_eq: { type: :string },
          addressable_id_eq: { type: :integer }
        }
      }

      response '200', 'addresses filtered' do
        schema type: :array, items: { type: :object }
        run_test!
      end
    end

    post('create address - Cadastra um endereço') do
      tags 'Addresses - Endereços'
      consumes 'application/json'
      parameter name: :address, in: :body, schema: {
        type: :object,
        properties: {
          zip_code: { type: :string },
          state: { type: :string },
          city: { type: :string },
          district: { type: :string },
          street: { type: :string },
          number: { type: :string },
          complement: { type: :string },
          meeting_point: { type: :string },
          landmark: { type: :string },
          addressable_type: { type: :string },
          addressable_id: { type: :integer }
        },
        required: %w[
          zip_code state city district street number addressable_type addressable_id
        ]
      }

      response(201, 'created') do
        let(:address) do
          {
            zip_code: '12345-678',
            state: 'SP',
            city: 'São Paulo',
            district: 'Centro',
            street: 'Rua A',
            number: '100',
            complement: 'Apto 2',
            meeting_point: 'Em frente ao mercado',
            landmark: 'Próximo à praça',
            addressable_type: 'Employee',
            addressable_id: 1
          }
        end
        run_test!
      end
    end
  end

  path '/addresses/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show address - Mostra detalhes de um Endereço') do
      tags 'Addresses - Endereços'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update address - Atualiza o cadastro de um Endereço') do
      tags 'Addresses - Endereços'
      consumes 'application/json'
      parameter name: :address, in: :body, schema: {
        type: :object,
        properties: {
          zip_code: { type: :string },
          state: { type: :string },
          city: { type: :string },
          district: { type: :string },
          street: { type: :string },
          number: { type: :string },
          complement: { type: :string },
          meeting_point: { type: :string },
          landmark: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:address) { { city: 'Campinas', meeting_point: 'Portaria' } }
        run_test!
      end
    end

    delete('delete address - Exclui cadastro de um Endereço') do
      tags 'Addresses - Endereços'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
