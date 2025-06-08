FactoryBot.define do
  factory :alert do
    category { %w[material certification].sample }
    message { "Test alert message" }
    resolved { false }
    reference_type { "Material" }
    reference_id { 1 }
  end
end
