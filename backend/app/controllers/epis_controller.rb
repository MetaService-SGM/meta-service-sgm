class EpisController < ApplicationController
  before_action :set_epi, only: %i[show edit update destroy]

  def index
    @epis = Epi.all
  end

  def show; end

  def new
    @epi = Epi.new
  end

  def create
    @epi = Epi.new(epi_params)
    if @epi.save
      redirect_to @epi, notice: 'EPI criado com sucesso.'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @epi.update(epi_params)
      redirect_to @epi, notice: 'EPI atualizado com sucesso.'
    else
      render :edit
    end
  end

  def destroy
    @epi.destroy
    redirect_to epis_url, notice: 'EPI removido com sucesso.'
  end

  private

  def set_epi
    @epi = Epi.find(params[:id])
  end

  def epi_params
    params.require(:epi).permit(:tipo, :tamanho, :colaborador_id)
  end
end
