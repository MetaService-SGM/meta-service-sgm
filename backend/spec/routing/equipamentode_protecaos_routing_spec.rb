require "rails_helper"

RSpec.describe EquipamentodeProtecaosController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/equipamentode_protecaos").to route_to("equipamentode_protecaos#index")
    end

    it "routes to #show" do
      expect(get: "/equipamentode_protecaos/1").to route_to("equipamentode_protecaos#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/equipamentode_protecaos").to route_to("equipamentode_protecaos#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/equipamentode_protecaos/1").to route_to("equipamentode_protecaos#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/equipamentode_protecaos/1").to route_to("equipamentode_protecaos#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/equipamentode_protecaos/1").to route_to("equipamentode_protecaos#destroy", id: "1")
    end
  end
end
