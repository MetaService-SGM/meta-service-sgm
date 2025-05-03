class EpisController < ApplicationController
  before_action :set_epis, only: %i[show edit update destroy]

  def index
    @epis = Epi.all
  end

  def show
    @epi = Epi.find(params[:id])
  end

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
  
  def edit
    @epi = Epi.find(params[:id])
  end

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
    params.require(:epi).permit(:cod_prod, :prod_descricao, :fornecedor, :qde_entrada, :qde_saida, :qde_saldo, :valor_estoque)
  end
end
