Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  root "home#index"

  resources :employees
  resources :addresses, only: %i[index show create update destroy]
  resources :materials, only: %i[index show create update destroy]
  resources :providers, only: %i[index show create update destroy]
  resources :users, only: %i[index show create update destroy]
  resources :dependents, only: %i[index show create update destroy]
  resources :contacts, only: %i[index show create update destroy]
  resources :companies, only: %i[index show create update destroy]
  resources :positions, only: %i[index show create update destroy]
  resources :certifications, only: %i[index show create update destroy]
  resources :documents, only: %i[index show create update destroy]
  resources :departments, only: %i[index show create update destroy]
  resources :employee_contracts, only: %i[index show create update destroy]
  resources :asos

  resources :work_orders do
    resources :work_order_materials, only: [:create, :update, :destroy]
    resources :work_order_employees, only: [:create, :destroy]
  end

  resources :stock_movements, only: [:index] do
    collection do
      post :create_in
      post :create_out
      post :create_return
      post :create_rollback
    end

    member do
      patch :approve
    end
  end

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  require 'sidekiq/web'
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  namespace :api do
    namespace :v1 do
      resources :alerts, only: [:index]
    end
  end
end
