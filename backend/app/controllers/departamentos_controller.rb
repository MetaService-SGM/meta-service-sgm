class DepartamentosController < ApplicationController
  def index
    departamentos = policy_scope(Departamento).ransack(params[:q]).result
    render json: departamentos.map { DepartamentoSerializer.call(_1) }
  end

  def show
    departamento = authorize Departamento.find(params[:id])
    render json: DepartamentoSerializer.call(departamento)
  end

  def create
    departamento = authorize Departamento.new(departamento_params)
    departamento.save!
    render json: DepartamentoSerializer.call(departamento), status: :created
  end

  def update
    departamento = authorize Departamento.find(params[:id])
    departamento.update!(departamento_params)
    render json: DepartamentoSerializer.call(departamento)
  end

  def destroy
    authorize Departamento.find(params[:id]).destroy!
    head :no_content
  end

  private

  def departamento_params
    params.require(:departamento).permit(:nome)
  end
end
