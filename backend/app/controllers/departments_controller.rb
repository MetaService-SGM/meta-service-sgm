class DepartmentsController < ApplicationController
  def index
    departments = policy_scope(Department).ransack(params[:q]).result
    render json: departments.map { DepartmentSerializer.call(_1) }
  end

  def show
    department = authorize Department.find(params[:id])
    render json: DepartmentSerializer.call(department)
  end

  def create
    department = authorize Department.new(department_params)
    department.save!
    render json: DepartmentSerializer.call(department), status: :created
  end

  def update
    department = authorize Department.find(params[:id])
    department.update!(department_params)
    render json: DepartmentSerializer.call(department)
  end

  def destroy
    authorize Department.find(params[:id]).destroy!
    head :no_content
  end

  private

  def department_params
    params.require(:department).permit(:name)
  end
end
