require 'rails_helper'

RSpec.describe 'Alerts API', type: :request do
  describe 'GET /api/v1/alerts' do
    let!(:material_alert) { create(:alert, category: 'material', resolved: false) }
    let!(:certification_alert) { create(:alert, category: 'certification', resolved: true) }

    it 'returns all alerts without filters' do
      get '/api/v1/alerts'

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body.size).to eq(2)
    end

    it 'filters alerts by category' do
      get '/api/v1/alerts', params: { category: 'material' }

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body.size).to eq(1)
      expect(body.first['category']).to eq('material')
    end

    it 'filters alerts by resolved status' do
      get '/api/v1/alerts', params: { resolved: true }

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body.size).to eq(1)
      expect(body.first['resolved']).to eq(true)
    end
  end
end
