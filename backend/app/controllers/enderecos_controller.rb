class EnderecosController < ApplicationController
  before_action :set_endereco, only: %i[show update destroy]

  def index
    @enderecos = Endereco.all
    render json: @enderecos.map { |e| EnderecoSerializer.new(e) }
  end

  def show
    render json: EnderecoSerializer.new(@endereco)
  end

  def create
    @endereco = Endereco.new(endereco_params)
    authorize @endereco
    if @endereco.save
      render json: EnderecoSerializer.new(@endereco), status: :created
    else
      render json: { errors: @endereco.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    authorize @endereco
    if @endereco.update(endereco_params)
      render json: EnderecoSerializer.new(@endereco)
    else
      render json: { errors: @endereco.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @endereco
    @endereco.destroy
    head :no_content
  end

  private

  def set_endereco
    @endereco = Endereco.find(params[:id])
  end

  def endereco_params
    params.require(:endereco).permit(:ponto_referencia, :ponto_encontro, :cep, :uf, :municipio,
                                     :bairro, :logradouro, :numero, :complemento, :colaborador_id)
  end
end
