class WorkOrderEmployeesController < ApplicationController
  before_action :set_work_order_employee, only: [:destroy]

  def create
    employee = WorkOrderEmployee.new(employee_params)
    authorize employee
    employee.save!
    render json: WorkOrderEmployeeSerializer.call(employee), status: :created
  end

  def destroy
    authorize @work_order_employee
    @work_order_employee.destroy
    head :no_content
  end

  private

  def set_work_order_employee
    @work_order_employee = WorkOrderEmployee.find(params[:id])
  end

  def employee_params
    params.require(:work_order_employee).permit(:work_order_id, :employee_id)
  end
end
