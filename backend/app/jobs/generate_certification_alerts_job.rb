class GenerateCertificationAlertsJob < ApplicationJob
  queue_as :default

  def perform
    Alert.where(category: 'certification').delete_all
    CertificationAlertService.call
  end
end
