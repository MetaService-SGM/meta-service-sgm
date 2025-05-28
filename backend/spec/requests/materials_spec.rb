require 'rails_helper'

RSpec.describe "Materials", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/materials/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/materials/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/materials/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/materials/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/materials/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
