class MaterialsController < ApplicationController
  def index
    authorize Material
    @materials = policy_scope(Material)
    render json: @materials
  end

  def show
    authorize material
    render json: material
  end

  def create
    authorize Material
    @material = Material.create!(material_params)
    render json: @material, status: :created
  end

  def update
    authorize material
    material.update!(material_params)
    render json: material, status: :ok
  end

  def destroy
    authorize material
    material.destroy
    head :no_content
  end

  private

  def material
    @material ||= Material.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: I18n.t('errors.not_found') }, status: :not_found
  end

  def material_params
    params.require(:material).permit(:nome, :categoria, :unidade_medida, :quantidade_minima, :quantidade_atual)
  end
end
