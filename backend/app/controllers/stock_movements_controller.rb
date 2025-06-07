class StockMovementsController < ApplicationController
  before_action :authenticate_user!
  after_action :verify_authorized

  def index
    @stock_movements = StockMovement.all.includes(:material, :approver)
    authorize StockMovement

    render json: @stock_movements.map { |movement| StockMovementSerializer.call(movement) }
  end

  def create_in
    authorize StockMovement, :process_in?
    perform_movement(:in)
  end

  def create_out
    authorize StockMovement, :process_out?
    perform_movement(:out)
  end

  def create_return
    authorize StockMovement, :process_return?
    perform_movement(:return)
  end

  def create_rollback
    authorize StockMovement, :process_rollback?

    rollback_params = params.require(:stock_movement).permit(
      :stock_movement_id,
      :moved_at,
      :employee_id,
      :notes
    )

    ActiveRecord::Base.transaction do
      original_movement = StockMovement.find(rollback_params[:stock_movement_id])
      material_id = original_movement.material_id
      quantity = original_movement.quantity
      work_order_id = original_movement.work_order_id

      stock_movement = StockManager.process_movement!(
        type: :rollback,
        material_id: material_id,
        quantity: quantity,
        moved_at: rollback_params[:moved_at],
        employee_id: rollback_params[:employee_id],
        work_order_id: work_order_id,
        notes: rollback_params[:notes],
        approver: current_user,
        rollback_from_id: original_movement.id
      )

      render json: StockMovementSerializer.call(stock_movement), status: :created
    end

  rescue ActiveRecord::RecordNotFound
    render json: { error: "Movimentação não encontrada." }, status: :not_found
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: "Erro ao criar rollback", details: e.record.errors.full_messages }, status: :unprocessable_entity
  rescue Pundit::NotAuthorizedError
    render json: { error: "Você não tem permissão para realizar rollback." }, status: :forbidden
  end

  private

  def perform_movement(type)
    permitted_params = params.require(:stock_movement).permit(
      :material_id,
      :quantity,
      :moved_at,
      :employee_id,
      :work_order_id,
      :notes
    )

    ActiveRecord::Base.transaction do
      stock_movement = StockManager.process_movement!(
        type: type,
        **permitted_params.to_h.symbolize_keys,
        approver: current_user
      )

      render json: StockMovementSerializer.call(stock_movement), status: :created
    end

  rescue ActiveRecord::RecordNotFound
    render json: { error: "Material ou Ordem de Serviço não encontrado." }, status: :not_found
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
  rescue Pundit::NotAuthorizedError
    render json: { error: "Você não tem permissão para esta operação." }, status: :forbidden
  end
end
