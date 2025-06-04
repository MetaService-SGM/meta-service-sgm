class EmployeeSerializer
  def self.call(employee)
    {
      id: employee.id,
      first_name: employee.first_name,
      full_name: employee.full_name,
      social_name: employee.social_name,
      function: employee.function,
      cpf: employee.cpf,
      cbo: employee.cbo,
      gender: employee.gender,
      birth_date: employee.birth_date,
      ethnicity: employee.ethnicity,
      marital_status: employee.marital_status,
      country: employee.country,
      nationality: employee.nationality,
      status: employee.status,
      education_level: employee.education_level,
      height: employee.height,
      weight: employee.weight,
      foto_url: foto_url(employee),
      created_at: employee.created_at,
      updated_at: employee.updated_at
    }
  end

  def self.foto_url(employee)
    return unless employee.foto.attached?

    Rails.application.routes.url_helpers.rails_blob_url(
      employee.foto,
      host: Rails.application.credentials.dig(:host) || 'http://localhost:3000'
    )
  end
end
