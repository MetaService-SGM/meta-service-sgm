class ContatoEmergenciaController < ApplicationController
  before_action :set_contato_emergencia, only: [:show, :update, :destroy]

  # GET /contato_emergencia
  def index
    @contatos = ContatoEmergencia.all
    render json: @contatos
  end

  # GET /contato_emergencia/:id
  def show
    render json: @contato_emergencia
  end

  # POST /contato_emergencia
  def create
    @contato_emergencia = ContatoEmergencia.new(contato_emergencia_params)

    if @contato_emergencia.save
      render json: @contato_emergencia, status: :created
    else
      render json: @contato_emergencia.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contato_emergencia/:id
  def update
    if @contato_emergencia.update(contato_emergencia_params)
      render json: @contato_emergencia
    else
      render json: @contato_emergencia.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contato_emergencia/:id
  def destroy
    @contato_emergencia.destroy
    head :no_content
  end

  private

  def set_contato_emergencia
    @contato_emergencia = ContatoEmergencia.find(params[:id])
  end

  def contato_emergencia_params
    params.require(:contato_emergencia).permit(:colaborador_id, :nome, :telefone, :operadora, :parentesco)
  end
end