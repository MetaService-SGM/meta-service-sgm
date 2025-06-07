class WorkOrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user.admin? ? scope.all : scope.joins(:employees).where(employees: { id: user.id }).distinct
    end
  end

  def index?
    user.present?
  end

  def show?
    user.admin? || record.employees.include?(user)
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
