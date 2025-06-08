class EmployeeContractsController < ApplicationController
  def index
    @q = EmployeeContract.ransack(params[:q])
    @employee_contracts = @q.result.includes(:employee, :position, :department)

    render json: @employee_contracts, status: :ok
  end

  def show
    employee_contracts = EmployeeContract.find(params[:id])
    authorize employee_contracts
    render json: EmployeeContractSerializer.call(employee_contracts)
  end

  def create
    employee_contract = EmployeeContract.create!(employee_contract_params)
    render json: employee_contract, status: :created
  end

  def update
    employee_contracts = EmployeeContract.find(params[:id])
    authorize employee_contracts
    employee_contracts.update!(employee_contract_params)
    render json: EmployeeContractSerializer.call(employee_contracts)
  end

  def destroy
    employee_contracts = EmployeeContract.find(params[:id])
    authorize employee_contracts
    employee_contracts.destroy!
    head :no_content
  end

  private

  def employee_contract_params
    params.require(:employee_contract).permit(
        :contract_type, :unit, :shift, :currency, :hourly_wage, :admission_date,
        :trial_period, :registration_number, :direct_supervisor, :hierarchy_level,
        :contract_date, :contract_duration, :contract_expiration, :total_days,
        :employee_id, :position_id, :department_id, :total_hours
    )
  end
end
