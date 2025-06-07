class WorkOrdersController < ApplicationController
  before_action :set_work_order, only: [:show, :update, :destroy]

  def index
    work_orders = WorkOrder.includes(:materials, :employees).all
    render json: work_orders.map { |wo| WorkOrderSerializer.call(wo) }
  end

  def show
    render json: WorkOrderSerializer.call(@work_order)
  end

  def create
    work_order = WorkOrder.new(work_order_params)
    authorize work_order
    work_order.save!
    render json: WorkOrderSerializer.call(work_order), status: :created
  end

  def update
    authorize @work_order
    @work_order.update!(work_order_params)
    render json: WorkOrderSerializer.call(@work_order)
  end

  def destroy
    authorize @work_order
    @work_order.destroy
    head :no_content
  end

  private

  def set_work_order
    @work_order = WorkOrder.find(params[:id])
  end

  def work_order_params
    params.require(:work_order).permit(
      :client_order_number,
      :opened_at,
      :started_at,
      :expected_end_at,
      :status,
      :priority,
      :requester_name,
      :requester_department,
      :requester_contact,
      :responsible,
      :notes,
      :expected_days,
      :value,
      work_order_employees_attributes: [:employee_id],
      work_order_materials_attributes: [:material_id, :quantity, :returned_quantity]
    )
  end
end
