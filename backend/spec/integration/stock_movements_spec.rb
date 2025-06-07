require 'swagger_helper'

RSpec.describe 'Stock Movements', type: :request do
  path '/stock_movements' do
    get('List stock movements - Lista todos os movimentos de estoque') do
      tags 'Stock Movements - Movimentos de Estoque'
      produces 'application/json'
      security [ bearer_auth: [] ]

      response(200, 'sucesso') do
        run_test!
      end
    end
  end

  path '/stock_movements/create_in' do
    post('Create entry movements - Cria movimento de entrada') do
      tags 'Stock Movements - Movimentos de Estoque'
      consumes 'application/json'
      produces 'application/json'
      security [ bearer_auth: [] ]

      parameter name: :stock_movement, in: :body, schema: {
        type: :object,
        properties: {
          stock_movement: {
            type: :object,
            properties: {
              material_id: { type: :integer },
              work_order_id: { type: :integer },
              quantity: { type: :number },
              moved_at: { type: :string, format: :date_time },
              notes: { type: :string },
              employee_id: { type: :integer }
            },
            required: %w[material_id work_order_id quantity moved_at employee_id]
          }
        }
      }

      response(201, 'criado com sucesso') do
        run_test!
      end
    end
  end

  path '/stock_movements/create_out' do
    post('Create outgoing movement. - Cria movimento de saída') do
      tags 'Stock Movements - Movimentos de Estoque'
      consumes 'application/json'
      produces 'application/json'
      security [ bearer_auth: [] ]

      parameter name: :stock_movement, in: :body, schema: {
        type: :object,
        properties: {
          stock_movement: {
            type: :object,
            properties: {
              material_id: { type: :integer },
              work_order_id: { type: :integer },
              quantity: { type: :number },
              moved_at: { type: :string, format: :date },
              notes: { type: :string },
              employee_id: { type: :integer }
            },
            required: %w[material_id work_order_id quantity moved_at employee_id]
          }
        }
      }

      response(201, 'criado com sucesso') do
        run_test!
      end
    end
  end

  path '/stock_movements/create_return' do
    post('Create return movement - Cria movimento de retorno') do
      tags 'Stock Movements - Movimentos de Estoque'
      consumes 'application/json'
      produces 'application/json'
      security [ bearer_auth: [] ]

      parameter name: :stock_movement, in: :body, schema: {
        type: :object,
        properties: {
          stock_movement: {
            type: :object,
            properties: {
              material_id: { type: :integer },
              work_order_id: { type: :integer },
              quantity: { type: :number },
              moved_at: { type: :string, format: :date },
              notes: { type: :string },
              employee_id: { type: :integer }
            },
            required: %w[material_id work_order_id quantity moved_at employee_id]
          }
        }
      }

      response(201, 'criado com sucesso') do
        run_test!
      end
    end
  end

  path '/stock_movements/create_rollback' do
    post('Create movements rollback - Cria rollback de movimento') do
      tags 'Stock Movements - Movimentos de Estoque'
      consumes 'application/json'
      produces 'application/json'
      security [ bearer_auth: [] ]

      parameter name: :stock_movement, in: :body, schema: {
        type: :object,
        properties: {
          stock_movement: {
            type: :object,
            properties: {
              stock_movement_id: { type: :integer },
              moved_at: { type: :string, format: :date },
              notes: { type: :string },
              employee_id: { type: :integer }
            },
            required: %w[stock_movement_id moved_at employee_id]
          }
        }
      }

      response(201, 'rollback criado com sucesso') do
        run_test!
      end

      response(404, 'movimentação não encontrada') do
        run_test!
      end
    end
  end
end
