class DependentesController < ApplicationController
  def index
    authorize Dependente
    @q = policy_scope(Dependente).ransack(params[:q])
    dependentes = @q.result(distinct: true).order(id: :asc)
    render json: dependentes.map { |d| DependenteSerializer.call(d) }
  end

  def show
    authorize dependente
    render json: DependenteSerializer.call(dependente)
  end

  def create
    dependente = Dependente.new(dependente_params)
    authorize dependente
    dependente.save!
    render json: DependenteSerializer.call(dependente), status: :created
  end

  def update
    authorize dependente
    dependente.update!(dependente_params)
    render json: DependenteSerializer.call(dependente)
  end

  def destroy
    authorize dependente
    dependente.destroy

    head :no_content
  end

  private

  def dependente
    @dependente ||= Dependente.find(params[:id])
  end
  def dependente_params
    params.require(:dependente).permit(:nome, :parentesco, :data_nascimento, :colaborador_id, :documento)
  end
end
