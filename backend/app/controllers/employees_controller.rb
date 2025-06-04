class EmployeesController < ApplicationController
  before_action :set_employee, only: [:show, :update, :destroy]

  def index
    @employees = Employee.all
    authorize @employees
    render json: @employees.map { |col| EmployeeSerializer.call(col) }
  end

  def show
    authorize @employee
    render json: EmployeeSerializer.call(@employee)
  end

  def create
    @employee = Employee.new(employee_params)
    authorize @employee

    if @employee.save
      render json: EmployeeSerializer.call(@employee), status: :created
    else
      render json: { errors: @employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    authorize @employee

    if @employee.update(employee_params)
      render json: EmployeeSerializer.call(@employee)
    else
      render json: { errors: @employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @employee
    @employee.destroy
    head :no_content
  end

  private

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(
      :first_name,
      :cpf,
      :cbo,
      :full_name,
      :social_name,
      :function,
      :gender,
      :birth_date,
      :ethnicity,
      :marital_status,
      :country,
      :nationality,
      :status,
      :education_level,
      :height,
      :weight,
      :foto
  )
  end
end
