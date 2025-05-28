require 'rails_helper'

RSpec.describe "Prestadors", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/prestadors/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/prestadors/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/prestadors/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/prestadors/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/prestadors/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
