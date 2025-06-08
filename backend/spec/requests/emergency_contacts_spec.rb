require 'rails_helper'

RSpec.describe "EmergencyContacts", type: :request do
  describe "GET /emergency_contacts" do
    it "works! (now write some real specs)" do
      get emergency_contacts_index_path
      expect(response).to have_http_status(200)
    end
  end
end
