class StockMovementPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.joins(:work_order).merge(WorkOrderPolicy::Scope.new(user, WorkOrder).resolve)
    end
  end

  def index?
    user.present?
  end

  def process_out?
    user.admin? || user.gerente?
  end

  def process_rollback?
    user.admin? || user.gerente?
  end

  def process_return?
    user.present?
  end

  def process_in?
    user.admin? || user.gerente?
  end
end
