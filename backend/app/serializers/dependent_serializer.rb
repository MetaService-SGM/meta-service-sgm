class DependentSerializer
  def self.call(dependent)
    {
      id: dependent.id,
      full_name: dependent.full_name,
      kinship: dependent.kinship,
      birth_date: dependent.birth_date,
      age: dependent.age,
      employee_id: dependent.employee_id,
      documento_url: documento_url(dependent)
    }
  end

  def self.documento_url(dependent)
    return unless dependent.documento.attached?

    Rails.application.routes.url_helpers.rails_blob_url(
      dependent.documento,
      host: Rails.application.credentials.dig(:host) || 'localhost:3000'
    )
  end

  def self.idade(dependent)
    return unless dependent.data_nascimento

    now = Time.zone.today
    dob = dependent.data_nascimento
    now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
  end
end
