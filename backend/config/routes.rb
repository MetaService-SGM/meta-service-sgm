Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  resources :epis, only: %i[index show create update destroy]
  resources :entrega_epi, only: %i[index show create update destroy]
  resources :materials, only: %i[index show create update destroy]
  resources :prestadors, only: %i[index show create update destroy]
  resources :users, only: %i[index show create update destroy]
end
