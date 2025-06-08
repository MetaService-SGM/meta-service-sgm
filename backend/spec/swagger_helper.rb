require 'rails_helper'

RSpec.configure do |config|
  config.openapi_root = Rails.root.join('swagger').to_s

  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'Meta-Service-SGM API V1',
        version: 'v1'
      },
      components: {
        securitySchemes: {
          tokenAuth: {
            type: :apiKey,
            in: :header,
            name: 'access-token',
            description: 'Token de autenticação (Devise Token Auth). Requer também os headers: client e uid.'
          },
          clientHeader: {
            type: :apiKey,
            in: :header,
            name: 'client'
          },
          uidHeader: {
            type: :apiKey,
            in: :header,
            name: 'uid'
          }
        }
      },
      security: [
        { tokenAuth: [] },
        { clientHeader: [] },
        { uidHeader: [] }
      ],
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de Desenvolvimento'
        }
      ],
      paths: {}
    }
  }

  config.openapi_format = :yaml
end
