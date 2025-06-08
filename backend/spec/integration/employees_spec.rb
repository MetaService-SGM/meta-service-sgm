require 'swagger_helper'

RSpec.describe 'employees', type: :request do
  path '/employees' do
    get('list employees - Lista todos os Colaboradores') do
      tags 'Employees - Colaboradores'
      produces 'application/json'
      parameter name: :q, in: :query, schema: {
        type: :object,
        properties: {
          contract_type: { type: :string },
          unit: { type: :string },
          shift: { type: :string },
          currency: { type: :string },
          hourly_wage: { type: :number },
          admission_date: { type: :string, format: :date },
          trial_period: { type: :boolean },
          registration_number: { type: :string },
          direct_supervisor: { type: :string },
          hierarchy_level: { type: :string },
          contract_date: { type: :string, format: :date },
          contract_duration: { type: :integer },
          contract_expiration: { type: :string, format: :date },
          total_days: { type: :integer },
          employee_id: { type: :integer },
          position_id: { type: :integer },
          department_id: { type: :integer },
          total_hours: { type: :integer }
        }
      }
      response(200, 'successful') do
        run_test!
      end
    end

    post('create employee - Cadastra um Colaborador') do
      tags 'Employees - Colaboradores'
      consumes 'application/json'
      parameter name: :employee, in: :body, schema: {
        type: :object,
        properties: {
          first_name: { type: :string },
          cpf: { type: :string },
          cbo: { type: :string },
          full_name: { type: :string },
          social_name: { type: :string },
          function: { type: :string },
          gender: { type: :string },
          birth_date: { type: :string, format: :date },
          ethnicity: { type: :string },
          marital_status: { type: :string },
          country: { type: :string },
          nationality: { type: :string },
          status: { type: :string },
          education_level: { type: :string },
          height: { type: :number },
          weight: { type: :number }
        },
        required: ['first_name', 'cpf']
      }

      response(201, 'created') do
        let(:employee) { { first_name: 'João', cpf: '12345678900' } }
        run_test!
      end
    end
  end

  path '/employees/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'ID do funcionário'

    get('show employee - Mostra detalhes de um Colaborador') do
      tags 'Employees - Colaboradores'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update employee - Atualiza o cadastro de um Colaborador') do
      tags 'Employees - Colaboradores'
      consumes 'application/json'
      parameter name: :employee, in: :body, schema: {
        type: :object,
        properties: {
          full_name: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:employee) { { full_name: 'João da Silva' } }
        run_test!
      end
    end

    delete('delete employee - Exclui o cadastro de um Colaborador') do
      tags 'Employees - Colaboradores'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
