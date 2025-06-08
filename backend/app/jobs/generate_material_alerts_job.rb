class GenerateMaterialAlertsJob < ApplicationJob
  queue_as :default

  def perform
    Alert.where(category: 'material').delete_all
    MaterialAlertService.call
  end
end
