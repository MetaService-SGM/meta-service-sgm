source "https://rubygems.org"

ruby "3.2.3"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.3"

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'

# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '~> 6.0'
# Adição da gem pundit
gem 'pundit', '~> 2.4'

gem 'active_storage_validations'

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
# gem "jbuilder"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem "rack-cors"
# adicionando a gem sidekiq
  gem 'sidekiq'
# Enables Cross-Origin Resource Sharing (CORS), allowing APIs to be accessed from different domains
gem 'rack-cors'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails', groups: %i[development test]
  gem 'rspec-rails', '~> 6.0'
  gem 'rubocop', require: false

end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

gem 'devise', '~> 4.9'
gem 'cpf_cnpj'
gem 'devise_token_auth'
gem 'image_processing', '~> 1.2'
gem 'ransack', '~> 4.0'
gem "jsonapi-serializer", "~> 2.2"
gem 'whenever', require: false
gem 'rswag'
gem 'faker'
gem 'factory_bot_rails'

gem "dockerfile-rails", ">= 1.7", :group => :development

gem "redis", "~> 5.4"
