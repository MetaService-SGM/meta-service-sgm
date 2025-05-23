class ColaboradorsController < ApplicationController
  before_action :set_colaborador, only: %i[ show update destroy ]

  # GET /colaboradors
  def index
    @colaboradors = Colaborador.all

    render json: @colaboradors
  end

  # GET /colaboradors/1
  def show
    render json: @colaborador
  end

  # POST /colaboradors
  def create
    @colaborador = Colaborador.new(colaborador_params)

    if @colaborador.save
      render json: @colaborador, status: :created, location: @colaborador
    else
      render json: @colaborador.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /colaboradors/1
  def update
    if @colaborador.update(colaborador_params)
      render json: @colaborador
    else
      render json: @colaborador.errors, status: :unprocessable_entity
    end
  end

  # DELETE /colaboradors/1
  def destroy
    @colaborador.destroy!
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
      :peso
  )
  end
end
