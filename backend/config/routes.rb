Rails.application.routes.draw do
  resources :materials, only: %i[index show create update destroy]
  resources :prestadors, only: %i[index show create update destroy]
  resources :users, only: %i[index show create update destroy]
end
