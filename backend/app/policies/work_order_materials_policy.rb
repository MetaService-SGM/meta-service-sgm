class WorkOrderMaterialsPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.joins(:work_order).merge(WorkOrderPolicy::Scope.new(user, WorkOrder).resolve)
    end
  end

  def create?
    user.admin?
  end

  def update?
    user.admin?
  end

  def destroy?
    user.admin?
  end
end
