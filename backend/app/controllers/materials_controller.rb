class MaterialsController < ApplicationController
  def index
    materials = Material.ransack(params[:q]).result
    render json: materials.map { |material| MaterialSerializer.call(material) }
  end

  def show
    material = Material.find(params[:id])
    render json: MaterialSerializer.call(material)
  end

  def create
    material = Material.create!(material_params)
    render json: MaterialSerializer.call(material), status: :created
  end

  def update
    material = Material.find(params[:id])
    material.update!(material_params)
    render json: MaterialSerializer.call(material)
  end

  def destroy
    material = Material.find(params[:id])
    material.destroy!
    head :no_content
  end

  private

  def material_params
    params.require(:material).permit(
      :name, :category, :unit_of_measure,
      :minimum_quantity, :current_quantity,
      :approval_certificate, :material_type,
      :color, :size, :internal_code
    )
  end
end
