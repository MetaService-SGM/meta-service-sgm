Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  resources :colaboradors
  resources :contrato_colaboradors
  resources :enderecos, only: %i[index show create update destroy]
  resources :epis, only: %i[index show create update destroy]
  resources :entrega_epi, only: %i[index show create update destroy]
  resources :materials, only: %i[index show create update destroy]
  resources :prestadors, only: %i[index show create update destroy]
  resources :users, only: %i[index show create update destroy]
end
