class UserSerializer < ApplicationSerializer
  def self.call(user)
    base_data = {
      name: user.name,
      email: user.email,
      cpf:  user.cpf,
      role: user.role,
      contract_type: user.contract_type,
      active: user.active,
      admin: user.admin?
    }

    base_data.merge(serialize_timestamps(user))
  end
end
