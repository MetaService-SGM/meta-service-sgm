require 'swagger_helper'

RSpec.describe 'employee_contracts', type: :request do
  path '/employee_contracts' do
    get('list employee_contracts') do
      tags 'EmployeeContracts'
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

    post('create employee_contract') do
      tags 'EmployeeContracts'
      consumes 'application/json'
      parameter name: :employee_contract, in: :body, schema: {
        type: :object,
        properties: {
          contract_type: { type: :string },
          unit: { type: :string },
          shift: { type: :string },
          currency: { type: :string },
          hourly_wage: { type: :number },
          admission_date: { type: :string, format: :date },
          trial_period: { type: :string },
          registration_number: { type: :string },
          direct_supervisor: { type: :string },
          hierarchy_level: { type: :string },
          contract_date: { type: :string, format: :date },
          contract_duration: { type: :string },
          contract_expiration: { type: :string, format: :date },
          total_days: { type: :integer },
          employee_id: { type: :integer },
          position_id: { type: :integer },
          department_id: { type: :integer },
          start_date: { type: :string, format: :date },
          end_date: { type: :string, format: :date },
          total_hours: { type: :string }
        }
      }

      response(201, 'created') do
        let(:employee_contract) { { contract_type: 'CLT' } }
        run_test!
      end
    end
  end

  path '/employee_contracts/{id}' do
    parameter name: 'id', in: :path, type: :string

    get('show employee_contract') do
      tags 'EmployeeContracts'
      produces 'application/json'
      response(200, 'successful') do
        let(:id) { '1' }
        run_test!
      end
    end

    patch('update employee_contract') do
      tags 'EmployeeContracts'
      consumes 'application/json'
      parameter name: :employee_contract, in: :body, schema: {
        type: :object,
        properties: {
          contract_type: { type: :string }
        }
      }

      response(200, 'updated') do
        let(:id) { '1' }
        let(:employee_contract) { { contract_type: 'PJ' } }
        run_test!
      end
    end

    delete('delete employee_contract') do
      tags 'EmployeeContracts'
      response(204, 'no content') do
        let(:id) { '1' }
        run_test!
      end
    end
  end
end
