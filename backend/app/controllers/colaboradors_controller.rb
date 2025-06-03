class ColaboradorsController < ApplicationController
  before_action :set_colaborador, only: [:show, :update, :destroy]

  def index
    @colaboradors = Colaborador.all
    authorize @colaboradors
    render json: @colaboradors.map { |col| ColaboradorSerializer.call(col) }
  end

  def show
    authorize @colaborador
    render json: ColaboradorSerializer.call(@colaborador)
  end

  def create
    @colaborador = Colaborador.new(colaborador_params)
    authorize @colaborador

    if @colaborador.save
      render json: ColaboradorSerializer.call(@colaborador), status: :created
    else
      render json: { errors: @colaborador.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    authorize @colaborador

    if @colaborador.update(colaborador_params)
      render json: ColaboradorSerializer.call(@colaborador)
    else
      render json: { errors: @colaborador.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @colaborador
    @colaborador.destroy
    head :no_content
  end

  private

  def set_colaborador
    @colaborador = Colaborador.find(params[:id])
  end

  def colaborador_params
    params.require(:colaborador).permit(
      :nome,
      :cpf,
      :cbo,
      :nome_completo,
      :nome_social,
      :funcao,
      :genero,
      :data_nasc,
      :cor_ou_raca,
      :estado_civil,
      :pais,
      :nacionalidade,
      :situacao,
      :escolaridade,
      :altura,
      :peso,
      :foto
  )
  end
end
