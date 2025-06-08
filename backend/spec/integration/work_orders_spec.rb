require 'swagger_helper'

RSpec.describe 'Work Orders API', type: :request do
  path '/work_orders' do
    get('List work orders - Lista todas as ordens de serviço') do
      tags 'Work Orders - Ordens de Serviço'
      produces 'application/json'
      security [ bearer_auth: [] ]

      response(200, 'sucesso') do
        run_test!
      end
    end

    post('Create work order - Cria uma nova ordem de serviço') do
      tags 'Work Orders - Ordens de Serviço'
      consumes 'application/json'
      produces 'application/json'
      security [ bearer_auth: [] ]

      parameter name: :work_order, in: :body, schema: {
        type: :object,
        properties: {
          work_order: {
            type: :object,
            properties: {
              client_order_number: { type: :string },
              opened_at: { type: :string, format: :date },
              started_at: { type: :string, format: :date },
              expected_end_at: { type: :string, format: :date },
              status: { type: :string, enum: %w[open in_progress closed canceled] },
              priority: { type: :string, enum: %w[low medium high urgent] },
              requester_name: { type: :string },
              requester_department: { type: :string },
              requester_contact: { type: :string },
              responsible: { type: :string },
              notes: { type: :string },
              expected_days: { type: :integer },
              value: { type: :string },
              work_order_materials_attributes: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    material_id: { type: :integer },
                    quantity: { type: :number },
                    returned_quantity: { type: :number }
                  }
                }
              },
              work_order_employees_attributes: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    employee_id: { type: :integer }
                  }
                }
              }
            },
            required: %w[client_order_number opened_at started_at expected_end_at status priority requester_name requester_department requester_contact responsible expected_days value]
          }
        }
      }

      response(201, 'criado com sucesso') do
        run_test!
      end
    end
  end

  path '/work_orders/{id}' do
    parameter name: :id, in: :path, type: :integer

    get('Show work order - Mostra detalhes de uma ordem de serviço') do
      tags 'Work Orders - Ordens de Serviço'
      produces 'application/json'
      security [ bearer_auth: [] ]

      response(200, 'sucesso') do
        run_test!
      end

      response(404, 'não encontrado') do
        run_test!
      end
    end

    delete('Delete work order - Exclui a ordem de serviço (se possível)') do
      tags 'Work Orders - Ordens de Serviço'
      produces 'application/json'
      security [ bearer_auth: [] ]

      response(204, 'excluído com sucesso') do
        run_test!
      end

      response(422, 'não é possível excluir (ordem com materiais ou colaboradores)') do
        run_test!
      end
    end
  end

  path '/work_orders/{id}' do
    parameter name: :id, in: :path, type: :integer

    patch('Update work order - Atualiza uma ordem de serviço') do
      tags 'Work Orders - Ordens de Serviço'
      consumes 'application/json'
      produces 'application/json'
      security [ bearer_auth: [] ]

      parameter name: :work_order, in: :body, schema: {
        type: :object,
        properties: {
          work_order: {
            type: :object,
            properties: {
              client_order_number: { type: :string },
              opened_at: { type: :string, format: :date },
              started_at: { type: :string, format: :date },
              expected_end_at: { type: :string, format: :date },
              status: { type: :string, enum: %w[open in_progress closed canceled] },
              priority: { type: :string, enum: %w[low medium high urgent] },
              requester_name: { type: :string },
              requester_department: { type: :string },
              requester_contact: { type: :string },
              responsible: { type: :string },
              notes: { type: :string },
              expected_days: { type: :integer },
              value: { type: :string },
              work_order_employees_attributes: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    employee_id: { type: :integer }
                  }
                }
              },
              work_order_materials_attributes: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    material_id: { type: :integer },
                    quantity: { type: :number },
                    returned_quantity: { type: :number }
                  }
                }
              }
            }
          }
        }
      }

      response(200, 'ordem atualizada com sucesso') do
        run_test!
      end

      response(404, 'ordem não encontrada') do
        run_test!
      end

      response(422, 'parâmetros inválidos') do
        run_test!
      end
    end
  end
end
