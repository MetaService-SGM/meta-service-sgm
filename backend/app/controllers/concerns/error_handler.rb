module ErrorHandler
    extend ActiveSupport::Concern
  
    included do
      rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    end
  
    private
  
    def render_error(resource)
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  
    def render_not_found(resource_name = 'Resource')
      render json: { error: "#{resource_name} not found" }, status: :not_found
    end
  
    def render_unprocessable_entity(exception)
      render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
  end
