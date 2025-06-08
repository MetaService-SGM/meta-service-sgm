class PositionsController < ApplicationController
  before_action :set_position, only: [:show, :update, :destroy]
  before_action :authorize_position, only: [:show, :update, :destroy]
  before_action :authorize_collection, only: [:index, :create]

  def index
    positions = policy_scope(Position).ransack(params[:q]).result
    render json: positions.map(&PositionSerializer.method(:call))
  end

  def show
    render json: PositionSerializer.call(@position)
  end

  def create
    position = Position.new(position_params)
    authorize position
    position.save!
    render json: PositionSerializer.call(position), status: :created
  end

  def update
    @position.update!(position_params)
    render json: PositionSerializer.call(@position)
  end

  def destroy
    @position.destroy!
    head :no_content
  end

  private

  def set_position
    @position = Position.find(params[:id])
  end

  def position_params
    params.require(:position).permit(:name)
  end

  def authorize_position
    authorize @position
  end

  def authorize_collection
    authorize Position
  end
end
