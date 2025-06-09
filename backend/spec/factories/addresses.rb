FactoryBot.define do
  factory :address do
    zip_code { Faker::Base.regexify(/\d{5}-?\d{3}/) }
    state { Faker::Address.state_abbr }
    city { Faker::Address.city }
    district { Faker::Address.community }
    street { Faker::Address.street_name }
    number { Faker::Address.building_number }
    complement { Faker::Address.secondary_address }
    meeting_point { Faker::Lorem.sentence(word_count: 3) }
    landmark { Faker::Lorem.sentence(word_count: 3) }

    trait :for_employee do
      association :addressable, factory: :employee
    end

    trait :for_company do
      association :addressable, factory: :company
    end
  end
end