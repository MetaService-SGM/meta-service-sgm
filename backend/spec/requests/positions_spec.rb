require 'rails_helper'

RSpec.describe "Positions", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/positions/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/positions/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/positions/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/positions/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/positions/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
