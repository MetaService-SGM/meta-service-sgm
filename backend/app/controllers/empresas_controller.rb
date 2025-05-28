class EmpresasController < ApplicationController
  def index
    @q = policy_scope(Empresa).ransack(params[:q])
    @empresas = @q.result
    authorize Empresa
    render json: @empresas.map { |e| EmpresaSerializer.call(e) }
  end

  def show
    authorize @empresa
    render json: EmpresaSerializer.call(@empresa)
  end

  def create
    @empresa = Empresa.new(empresa_params)
    authorize @empresa
    if @empresa.save
      render json: EmpresaSerializer.call(@empresa), status: :created
    else
      render json: { errors: @empresa.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    authorize @empresa
    if @empresa.update(empresa_params)
      render json: EmpresaSerializer.call(@empresa)
    else
      render json: { errors: @empresa.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @empresa
    @empresa.destroy
    head :no_content
  end

  private

  def set_empresa
    @empresa = Empresa.find(params[:id])
  end

  def empresa_params
    params.require(:empresa).permit(:cnpj, :inscricao_estadual, :inscricao_municipal, :razao_social, :nome_fantasia, :segmento)
  end
end
