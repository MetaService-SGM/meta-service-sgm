class ContratoColaboradorsController < ApplicationController
  before_action :set_contrato_colaborador, only: %i[ show update destroy ]

  # GET /contrato_colaboradors
  def index
    @contrato_colaboradors = ContratoColaborador.all

    render json: @contrato_colaboradors
  end

  # GET /contrato_colaboradors/1
  def show
    render json: @contrato_colaborador
  end

  # POST /contrato_colaboradors
  def create
    @contrato_colaborador = ContratoColaborador.new(contrato_colaborador_params)

    if @contrato_colaborador.save
      render json: @contrato_colaborador, status: :created, location: @contrato_colaborador
    else
      render json: @contrato_colaborador.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contrato_colaboradors/1
  def update
    if @contrato_colaborador.update(contrato_colaborador_params)
      render json: @contrato_colaborador
    else
      render json: @contrato_colaborador.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contrato_colaboradors/1
  def destroy
    @contrato_colaborador.destroy!
  end

  private

    def set_contrato_colaborador
      @contrato_colaborador = ContratoColaborador.find(params[:id])
    end

    
    def contrato_colaborador_params
      params.require(:contrato_colaborador).permit(
        :data_inicio,
        :data_fim,
        :quantidade_horas,
        :valor_hora,
        :id_contrato_geral,
        :id_colaborador
      )
    end
end
