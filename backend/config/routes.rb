Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  resources :employees
  resources :contrato_employees
  resources :addresses, only: %i[index show create update destroy]
  resources :materials, only: %i[index show create update destroy]
  resources :providers, only: %i[index show create update destroy]
  resources :users, only: %i[index show create update destroy]
  resources :dependents, only: %i[index show create update destroy]
  resources :contacts, only: %i[index show create update destroy]
  resources :companies, only: %i[index show create update destroy]
  resources :positions, only: %i[index show create update destroy]
  resources :certifications, only: %i[index show create update destroy]
  resources :departments, only: %i[index show create update destroy]
  resources :employee_contracts, only: %i[index show create update destroy]
  resources :emergency_contacts, only: %i[index show create update destroy]

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
end
