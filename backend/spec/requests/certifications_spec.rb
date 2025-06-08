require 'rails_helper'

RSpec.describe "Certifications", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/certifications/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/certifications/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/certifications/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/certifications/update"
      expect(response).to have_http_status(:success)
    end
  end

end
