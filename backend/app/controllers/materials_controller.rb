class MaterialsController < ApplicationController
  before_action :set_material, only: %i[show update destroy]

  def index
    @materials = Material.all
    render json: @materials
  end

  def show
    render json: @material
  end

  def create
    @material = Material.new(material_params)
    if @material.save
      render json: @material, status: :created
    else
      render json: { errors: @material.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @material.update(material_params)
      render json: @material
    else
      render json: { errors: @material.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @material.destroy
    head :no_content
  end

  private

  def set_material
    @material = Material.find(params[:id])
  end

  def material_params
    params.require(:material).permit(:nome, :categoria, :unidade_medida, :quantidade_minima, :quantidade_atual)
  end
end
