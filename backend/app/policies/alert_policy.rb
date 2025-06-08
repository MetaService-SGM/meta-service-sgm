class AlertPolicy < ApplicationPolicy
  def index?
    user.admin? || user.role == "gestor"
  end

  def resolve?
    user.admin?
  end
end
