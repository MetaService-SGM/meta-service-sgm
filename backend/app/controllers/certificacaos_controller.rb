class CertificacaosController < ApplicationController
  before_action :set_certificacao, only: [:show, :update, :destroy]
  before_action :authorize_certificacao, only: [:show, :update, :destroy]
  before_action :authorize_collection, only: [:index, :create]

  def index
    certificacaos = policy_scope(Certificacao).ransack(params[:q]).result
    render json: certificacaos.map(&CertificacaoSerializer.method(:call))
  end

  def show
    render json: CertificacaoSerializer.call(@certificacao)
  end

  def create
    certificacao = Certificacao.new(certificacao_params)
    authorize certificacao
    certificacao.save!
    render json: CertificacaoSerializer.call(certificacao), status: :created
  end

  def update
    @certificacao.update!(certificacao_params)
    render json: CertificacaoSerializer.call(@certificacao)
  end

  def destroy
    @certificacao.destroy!
    head :no_content
  end

  private

  def set_certificacao
    @certificacao = Certificacao.find(params[:id])
  end

  def certificacao_params
    params.require(:certificacao).permit(:nome, :data_emissao, :validade, :colaborador_id, :cargo_id)
  end

  def authorize_certificacao
    authorize @certificacao
  end

  def authorize_collection
    authorize Certificacao
  end
end
