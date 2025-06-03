class DadosContratosController < ApplicationController
  def index
    @q = DadosContrato.ransack(params[:q])
    @dados_contratos = @q.result.includes(:colaborador, :cargo, :departamento)

    render json: @dados_contratos, status: :ok
  end

  def show
    dados_contratos = DadosContrato.find(params[:id])
    authorize dados_contratos
    render json: DadosContratoSerializer.call(dados_contratos)
  end

  def create
    dados_contrato = DadosContrato.create!(dados_contrato_params)
    render json: dados_contrato, status: :created
  end

  def update
    dados_contratos = DadosContrato.find(params[:id])
    authorize dados_contratos
    dados_contratos.update!(dados_contrato_params)
    render json: DadosContratoSerializer.call(dados_contratos)
  end

  def destroy
    dados_contratos = DadosContrato.find(params[:id])
    authorize dados_contratos
    dados_contratos.destroy!
    head :no_content
  end

  private

  def dados_contrato_params
    params.require(:dados_contrato).permit(
        :tipo_contrato, :unidade, :turno, :moeda, :salario_hora, :data_admissao,
        :periodo_experiencia, :matricula, :superior_direto, :grau_hierarquico,
        :data_contrato, :duracao_contrato, :vencimento_contrato, :total_dias,
        :colaborador_id, :cargo_id, :departamento_id, :quantidade_horas
    )
  end
end
