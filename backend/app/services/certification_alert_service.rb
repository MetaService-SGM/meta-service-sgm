class CertificationAlertService
  def self.call
    threshold = 30.days.from_now

    Alert.where(resolved: true)
         .where("created_at < ?", 30.days.ago)
         .delete_all

    Certification.where(expiration_date: ..threshold).find_each do |cert|
      existing_alert = Alert.find_by(
        category: 'certification',
        reference_type: 'Certification',
        reference_id: cert.id,
        resolved: false
      )

      next if existing_alert.present?

      if Alert.exists?(
        category: 'certification',
        reference_type: 'Certification',
        reference_id: cert.id,
        resolved: true
      )
        next
      end

      status = cert.expiration_date < Date.today ? "está vencida" : "expira em breve"

      Alert.create!(
        category: 'certification',
        message: "Certificação '#{cert.name}' #{status} (#{cert.expiration_date}).",
        reference_type: 'Certification',
        reference_id: cert.id
      )
    end
  end
end
