class ColaboradorPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def show?
    user.admin? || record.id == user.id
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
