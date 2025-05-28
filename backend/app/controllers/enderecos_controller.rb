class EnderecosController < ApplicationController
  before_action :set_endereco, only: %i[show update destroy]

  def index
    authorize Endereco
    @q = Endereco.ransack(params[:q])
    @enderecos = @q.result
    render json: @enderecos.map { |e| EnderecoSerializer.call(e) rescue nil }.compact
  end

  def show
    authorize @endereco
    render_success(EnderecoSerializer.call(@endereco))
  end

  def create
    @endereco = Endereco.new(endereco_params)
    authorize @endereco
    @endereco.save!
    render_success(EnderecoSerializer.call(@endereco), status: :created)
  end

  def update
    authorize @endereco
    @endereco.update!(endereco_params)
    render_success(EnderecoSerializer.call(@endereco))
  end

  def destroy
    authorize @endereco
    @endereco.destroy!
    head :no_content
  end

  private

  def set_endereco
    @endereco = Endereco.find(params[:id])
  end

  def endereco_params
    params.require(:endereco).permit(
      :ponto_referencia,
      :ponto_encontro,
      :cep,
      :uf,
      :municipio,
      :bairro,
      :logradouro,
      :numero,
      :complemento,
      :enderecoable_type,
      :enderecoable_id
    )
  end
end
