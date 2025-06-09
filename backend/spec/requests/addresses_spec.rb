require 'rails_helper'
require 'faker'

RSpec.describe 'Addresses', type: :request do
  let(:headers) { { 'Content-Type': 'application/json' } }

  describe 'POST /addresses' do
    context 'when addressable is an Employee' do
      let!(:employee) { create(:employee) }

      let(:valid_params) do
        {
          zip_code: Faker::Base.regexify(/\d{5}-?\d{3}/),
          state: Faker::Address.state_abbr,
          city: Faker::Address.city,
          district: Faker::Address.community,
          street: Faker::Address.street_name,
          number: Faker::Address.building_number,
          complement: Faker::Address.secondary_address,
          meeting_point: Faker::Lorem.sentence(word_count: 3),
          landmark: Faker::Lorem.sentence(word_count: 4),
          addressable_type: 'Employee',
          addressable_id: employee.id
        }
      end

      it 'creates address for employee with extra fields' do
        post '/addresses', params: { address: valid_params }.to_json, headers: headers
        expect(response).to have_http_status(:created)

        json = JSON.parse(response.body)
        expect(json['city']).to eq(valid_params[:city])
        expect(json['meeting_point']).to eq(valid_params[:meeting_point])
        expect(json['landmark']).to eq(valid_params[:landmark])
      end
    end

    context 'when addressable is a Company' do
      let!(:company) { create(:company) }

      let(:valid_params) do
        {
          zip_code: Faker::Base.regexify(/\d{5}-?\d{3}/),
          state: Faker::Address.state_abbr,
          city: Faker::Address.city,
          district: Faker::Address.community,
          street: Faker::Address.street_name,
          number: Faker::Address.building_number,
          complement: Faker::Address.secondary_address,
          meeting_point: Faker::Lorem.sentence(word_count: 3),
          landmark: Faker::Lorem.sentence(word_count: 4),
          addressable_type: 'Company',
          addressable_id: company.id
        }
      end

      it 'creates address for company with extra fields' do
        post '/addresses', params: { address: valid_params }.to_json, headers: headers
        expect(response).to have_http_status(:created)

        json = JSON.parse(response.body)
        expect(json['city']).to eq(valid_params[:city])
        expect(json['meeting_point']).to eq(valid_params[:meeting_point])
        expect(json['landmark']).to eq(valid_params[:landmark])
      end
    end
  end
end
