require 'swagger_helper'

RSpec.describe 'materials', type: :request do
  path '/materials' do
    get('list materials - Lista todos os Materiais (com ou sem filtro )') do
      tags 'Materials - Materiais'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          category: { type: :string },
          approval_certificate: { type: :string },
          internal_code: { type: :string },
          color: { type: :string },
          created_at: { type: :string, format: :date_time },
          id: { type: :integer },
          name: { type: :string },
          current_quantity: { type: :integer },
          minimum_quantity: { type: :integer },
          size: { type: :string },
          material_type: { type: :string },
          unit_of_measure: { type: :string },
          updated_at: { type: :string, format: :date_time }
        }
      }
      response(200, 'successful') do
        run_test!
      end
    end

    post('create material - Cadastra um Material') do
      tags 'Materials - Materiais'
      consumes 'application/json'
      parameter name: :material, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          category: { type: :string },
          unit_of_measure: { type: :string },
          minimum_quantity: { type: :integer },
          current_quantity: { type: :integer },
          approval_certificate: { type: :string },
          material_type: { type: :string },
          color: { type: :string },
          size: { type: :string },
          internal_code: { type: :string }
        }
      }

      response(201, 'created') do
        let(:material) { { name: 'Capacete' } }
        run_test!
      end
    end
  end

  path '/materials/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show material - Mostra detalhes de um Material') do
      tags 'Materials - Materiais'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update material - Atualiza o cadastro de um Material') do
      tags 'Materials - Materiais'
      consumes 'application/json'
      parameter name: :material, in: :body, schema: {
        type: :object,
        properties: {
          current_quantity: { type: :integer }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:material) { { current_quantity: 100 } }
        run_test!
      end
    end

    delete('delete material - Exclui o cadastro de um Material') do
      tags 'Materials - Materiais'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
