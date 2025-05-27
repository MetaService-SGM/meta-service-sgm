Rails.application.routes.draw do
  get 'cargos/index'
  get 'cargos/show'
  get 'cargos/create'
  get 'cargos/update'
  get 'cargos/destroy'
  mount_devise_token_auth_for 'User', at: 'auth'
  
  resources :colaboradors
  resources :contrato_colaboradors
  resources :enderecos, only: %i[index show create update destroy]
  resources :epis, only: %i[index show create update destroy]
  resources :entrega_epi, only: %i[index show create update destroy]
  resources :materials, only: %i[index show create update destroy]
  resources :prestadors, only: %i[index show create update destroy]
  resources :users, only: %i[index show create update destroy]
  resources :dependentes, only: %i[index show create update destroy]
  resources :contatos, only: %i[index show create update destroy]
  resources :empresas, only: %i[index show create update destroy]
  resources :cargos, only: %i[index show create update destroy]
  resources :certificacaos, only: %i[index show create update destroy]
  resources :departamentos, only: %i[index show create update destroy]
  resources :dados_contratos, only: %i[index show create update destroy]
end
