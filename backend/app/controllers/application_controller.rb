class ApplicationController < ActionController::API
  before_action :authenticate_user!, unless: :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?

  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit::Authorization
  include LocaleHandler
  include ErrorHandler

  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from Pundit::NotAuthorizedError, with: :handle_not_authorized
  rescue_from ActionController::ParameterMissing, with: :handle_missing_parameter
  rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid

  private

  def handle_record_invalid(exception)
    render json: { error: exception.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def handle_not_found
    render json: { error: I18n.t('errors.not_found') }, status: :not_found
  end

  def handle_not_authorized
    render json: { error: I18n.t('errors.unauthorized') }, status: :forbidden
  end

  def handle_missing_parameter(exception)
    param = exception.param || "parameter"
    render json: { error: I18n.t('errors.parameter_missing', param: param) }, status: :bad_request
  end

  def ensure_id_present
    unless params[:id].present?
      render json: { error: I18n.t('errors.missing_id') }, status: :bad_request
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation, :name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :password_confirmation, :name])
  end

  def render_success(resource, status: :ok)
    render json: resource, status: status
  end
  
  def render_failure(resource, status: :unprocessable_entity)
    render json: resource.errors, status: status
  end
end
