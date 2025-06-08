require 'swagger_helper'

RSpec.describe 'API V1 Alerts', type: :request do
  path '/api/v1/alerts' do
    get 'List alerts with filters - Lista todos os alerts com ou sem filtros' do
      tags 'Alerts - Alertas'
      produces 'application/json'
      parameter name: :category, in: :query, type: :string, description: 'Filtra por categoria (material ou certification)'
    #   parameter name: :resolved, in: :query, type: :boolean, description: 'Filtra por resolução (true ou false)'

      response '200', 'Lista de alerts retornada com sucesso' do
        schema type: :array, items: {
          type: :object,
          properties: {
            id: { type: :integer },
            category: { type: :string },
            resolved: { type: :boolean },
            created_at: { type: :string, format: :date_time },
            updated_at: { type: :string, format: :date_time }
          },
          required: %w[id category resolved created_at updated_at]
        }

        let(:category) { nil }
        let(:resolved) { nil }

        before do
          create(:alert, category: 'material', resolved: false)
          create(:alert, category: 'certification', resolved: true)
        end

        run_test!
      end

      response '400', 'Parâmetros inválidos' do
        let(:category) { 'outra_coisa' }
        run_test!
      end
    end
  end
end
