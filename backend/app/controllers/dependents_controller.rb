class DependentsController < ApplicationController
  def index
    authorize Dependent
    @q = policy_scope(Dependent).ransack(params[:q])
    dependents = @q.result(distinct: true).order(id: :asc)
    render json: dependents.map { |d| DependentSerializer.call(d) }
  end

  def show
    authorize dependent
    render json: DependentSerializer.call(dependent)
  end

  def create
    dependent = Dependent.new(dependent_params)
    authorize dependent
    dependent.save!
    render json: DependentSerializer.call(dependent), status: :created
  end

  def update
    authorize dependent
    dependent.update!(dependent_params)
    render json: DependentSerializer.call(dependent)
  end

  def destroy
    authorize dependent
    dependent.destroy

    head :no_content
  end

  private

  def dependent
    @dependent ||= Dependent.find(params[:id])
  end
  def dependent_params
    params.require(:dependent).permit(:full_name, :kinship, :birth_date, :employee_id, :documento)
  end
end
