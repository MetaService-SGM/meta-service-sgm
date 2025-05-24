class CargosController < ApplicationController
  before_action :set_cargo, only: [:show, :update, :destroy]
  before_action :authorize_cargo, only: [:show, :update, :destroy]
  before_action :authorize_collection, only: [:index, :create]

  def index
    cargos = policy_scope(Cargo).ransack(params[:q]).result
    render json: cargos.map(&CargoSerializer.method(:call))
  end

  def show
    render json: CargoSerializer.call(@cargo)
  end

  def create
    cargo = Cargo.new(cargo_params)
    authorize cargo
    cargo.save!
    render json: CargoSerializer.call(cargo), status: :created
  end

  def update
    @cargo.update!(cargo_params)
    render json: CargoSerializer.call(@cargo)
  end

  def destroy
    @cargo.destroy!
    head :no_content
  end

  private

  def set_cargo
    @cargo = Cargo.find(params[:id])
  end

  def cargo_params
    params.require(:cargo).permit(:nome)
  end

  def authorize_cargo
    authorize @cargo
  end

  def authorize_collection
    authorize Cargo
  end
end
