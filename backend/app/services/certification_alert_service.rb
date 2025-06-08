class CertificationAlertService
  def self.call
    threshold = 30.days.from_now

    Certification.where(expiration_date: ..threshold).find_each do |cert|
      next if Alert.exists?(category: 'certification', reference_type: 'Certification', reference_id: cert.id, resolved: false)

      Alert.create!(
        category: 'certification',
        message: "Certificação '#{cert.name}' expira em breve (#{cert.expiration_date}).",
        reference_type: 'Certification',
        reference_id: cert.id
      )
    end
  end
end
