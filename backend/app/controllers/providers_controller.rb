class ProvidersController < ApplicationController
  def index
    authorize Provider
    @providers = policy_scope(Provider)
    render json: @providers
  end

  def show
    authorize provider
    render json: provider
  end

  def create
    authorize Provider
    @provider = Provider.create!(provider_params)
    render json: @provider, status: :created
  end

  def update
    authorize provider
    provider.update!(provider_params)
    render json: provider, status: :ok
  end

  def destroy
    authorize provider
    provider.destroy
    head :no_content
  end

  private

  def provider
    @provider ||= Provider.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: I18n.t('errors.not_found') }, status: :not_found
  end

  def provider_params
    params.require(:provider).permit(:name, :cnpj, :address, :phone, :email)
  end
end
