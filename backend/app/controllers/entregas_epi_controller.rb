class EntregasEpiController < ApplicationController
  before_action :set_entrega_epi, only: %i[show edit update destroy]

  def index
    @entregas_epi = EntregaEpi.includes(:funcionario, :ordem_servico).all
  end

  def show; end

  def new
    @entrega_epi = EntregaEpi.new
  end

  def create
    @entrega_epi = EntregaEpi.new(entrega_epi_params)
    if @entrega_epi.save
      redirect_to @entrega_epi, notice: 'Entrega registrada com sucesso.'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @entrega_epi.update(entrega_epi_params)
      redirect_to @entrega_epi, notice: 'Entrega atualizada com sucesso.'
    else
      render :edit
    end
  end

  def destroy
    @entrega_epi.destroy
    redirect_to entregas_epi_url, notice: 'Entrega removida com sucesso.'
  end

  private

  def set_entrega_epi
    @entrega_epi = EntregaEpi.find(params[:id])
  end

  def entrega_epi_params
    params.require(:entrega_epi).permit(:data_retirada, :epi_descricao, :epi_ca, :num_camisa, :num_calca, :num_botina, :preco, :funcionario_id, :ordem_servico_id)
  end
end
