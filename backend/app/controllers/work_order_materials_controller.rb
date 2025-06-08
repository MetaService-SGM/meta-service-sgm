class WorkOrderMaterialsController < ApplicationController
  before_action :set_work_order_material, only: [:show, :update, :destroy]

  def index
    materials = WorkOrderMaterial.includes(:material).all
    render json: materials.map { |m| WorkOrderMaterialSerializer.call(m) }
  end

  def show
    render json: WorkOrderMaterialSerializer.call(@work_order_material)
  end

  def create
    material = WorkOrderMaterial.new(material_params)
    authorize material
    material.save!
    render json: WorkOrderMaterialSerializer.call(material), status: :created
  end

  def update
    authorize @work_order_material
    @work_order_material.update!(material_params)
    render json: WorkOrderMaterialSerializer.call(@work_order_material)
  end

  def destroy
    authorize @work_order_material
    @work_order_material.destroy
    head :no_content
  end

  private

  def set_work_order_material
    @work_order_material = WorkOrderMaterial.find(params[:id])
  end

  def material_params
    params.require(:work_order_material).permit(:work_order_id, :material_id, :quantity, :returned_quantity)
  end
end
