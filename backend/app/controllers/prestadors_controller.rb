class PrestadorsController < ApplicationController
  before_action :set_prestador, only: [:show, :update, :destroy]

  def index
    @prestadors = Prestador.all
    render json: @prestadors
  end

  def show
    render json: @prestador
  end

  def create
    @prestador = Prestador.new(prestador_params)
    if @prestador.save
      render json: @prestador, status: :created
    else
      render json: { errors: @prestador.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @prestador.update(prestador_params)
      render json: @prestador
    else
      render json: { errors: @prestador.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @prestador.destroy
    head :no_content
  end

  private

  def set_prestador
    @prestador = Prestador.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Prestador não encontrado" }, status: :not_found
  end

  def prestador_params
    params.require(:prestador).permit(:nome, :cnpj, :endereco, :telefone, :email)
  end
end
