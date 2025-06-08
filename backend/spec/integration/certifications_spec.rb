require 'swagger_helper'

RSpec.describe 'certifications', type: :request do
  path '/certifications' do
    get('list certifications - Lista Todos Certificados') do
      tags 'Certifications - Certificados'
      produces 'application/json'
      response(200, 'successful') do
        run_test!
      end
    end

    post('create certification - Cadastra um Certificado') do
      tags 'Certifications - Certificados'
      consumes 'application/json'
      parameter name: :certification, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          issue_date: { type: :string, format: :date },
          expiration_date: { type: :string, format: :date },
          employee_id: { type: :integer },
          position_id: { type: :integer }
        },
        required: ['name', 'issue_date', 'employee_id']
      }

      response(201, 'created') do
        let(:certification) do
          {
            name: 'NR-35',
            issue_date: '2024-01-01',
            expiration_date: '2026-01-01',
            employee_id: 1,
            position_id: 2
          }
        end
        run_test!
      end
    end
  end

  path '/certifications/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show certification - Mostra detalhes de um Certificado') do
      tags 'Certifications - Certificados'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update certification - Atualiza o Cadastro de um Certificado') do
      tags 'Certifications - Certificados'
      consumes 'application/json'
      parameter name: :certification, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          expiration_date: { type: :string, format: :date }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:certification) { { name: 'NR-10' } }
        run_test!
      end
    end

    delete('delete certification - Exclui um Certificado') do
      tags 'Certifications - Certificados'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
