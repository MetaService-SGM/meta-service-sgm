class UserSerializer < ApplicationSerializer
  def self.call(user)
    base_data = {
      name: user.name,
      email: user.email,
      cpf:  user.cpf,
      role: user.role,
      tipo_contrato: user.tipo_contrato,
      ativo: user.ativo,
      admin: user.admin?
    }

    base_data.merge(serialize_timestamps(user))
  end
end
