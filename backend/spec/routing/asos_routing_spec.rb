require "rails_helper"

RSpec.describe AsosController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/asos").to route_to("asos#index")
    end

    it "routes to #show" do
      expect(get: "/asos/1").to route_to("asos#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/asos").to route_to("asos#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/asos/1").to route_to("asos#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/asos/1").to route_to("asos#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/asos/1").to route_to("asos#destroy", id: "1")
    end
  end
end
