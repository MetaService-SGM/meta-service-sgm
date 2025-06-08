require 'rails_helper'

RSpec.describe "ContratoEmployees", type: :request do
  describe "GET /contrato_employees" do
    it "works! (now write some real specs)" do
      get contrato_employees_index_path
      expect(response).to have_http_status(200)
    end
  end
end
