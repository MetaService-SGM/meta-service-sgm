class UserPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def show?
    user.admin? || user.id == record.id
  end

  def create?
    user.admin?
  end

  def update?
    user.admin? || (user.role == 'user' && user.id == record.id)
  end

  def destroy?
    user.admin? && user.id != record.id
  end

  def permitted_attributes
    [:name, :email, :password, :cpf, :role, :contract_type, :active, :admin]
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      user.admin? ? scope.all : scope.none
    end
  end
end
