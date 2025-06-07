require 'rails_helper'

RSpec.describe "Departments", type: :request do
  describe "GET /departments" do
    it "works! (now write some real specs)" do
      get departments_index_path
      expect(response).to have_http_status(200)
    end
  end
end
