class CertificationSerializer
  def self.call(certification)
    {
      id: certification.id,
      name: certification.name,
      issue_date: certification.issue_date,
      expiration_date: certification.expiration_date,
      employee_id: certification.employee_id,
      employee_full_name: certification.employee.full_name,
      position_id: certification.position_id,
      position_name: certification.position.name,
      pdf_url: certification.pdf.attached? ? Rails.application.routes.url_helpers.rails_blob_url(certification.pdf, only_path: true) : nil
    }
  end
end
