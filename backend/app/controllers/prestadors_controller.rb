class PrestadorsController < ApplicationController
  def index
    authorize Prestador
    @prestadors = policy_scope(Prestador)
    render json: @prestadors
  end

  def show
    authorize prestador
    render json: prestador
  end

  def create
    authorize Prestador
    @prestador = Prestador.create!(prestador_params)
    render json: @prestador, status: :created
  end

  def update
    authorize prestador
    prestador.update!(prestador_params)
    render json: prestador, status: :ok
  end

  def destroy
    authorize prestador
    prestador.destroy
    head :no_content
  end

  private

  def prestador
    @prestador ||= Prestador.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: I18n.t('errors.not_found') }, status: :not_found
  end

  def prestador_params
    params.require(:prestador).permit(:nome, :cnpj, :endereco, :telefone, :email)
  end
end
