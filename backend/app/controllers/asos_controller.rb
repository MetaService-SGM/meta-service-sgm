class AsosController < ApplicationController
  before_action :set_aso, only: %i[ show update destroy ]

  # GET /asos
  def index
    @asos = Aso.all

    render json: @asos
  end

  # GET /asos/1
  def show
    render json: @aso
  end

  # POST /asos
  def create
    @aso = Aso.new(aso_params)

    if @aso.save
      render json: @aso, status: :created, location: @aso
    else
      render json: @aso.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /asos/1
  def update
    if @aso.update(aso_params)
      render json: @aso
    else
      render json: @aso.errors, status: :unprocessable_entity
    end
  end

  # DELETE /asos/1
  def destroy
    @aso.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_aso
      @aso = Aso.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def aso_params
      params.require(:aso).permit(:fit_for_activity, :issued_at, :expires_at, :employee_contracts_id)
    end
end
