module Api
  module V1
    class AlertsController < ApplicationController
      def index
        alerts = Alert.all
        alerts = alerts.where(category: params[:category]) if params[:category].present?
        alerts = alerts.where(resolved: ActiveModel::Type::Boolean.new.cast(params[:resolved])) if params[:resolved].present?
        alerts = alerts.order(created_at: :desc)

        render json: alerts.map { |alert|
          alert.as_json(
            only: [:id, :category, :message, :resolved, :reference_type, :reference_id, :created_at]
          ).merge(employee_name: alert.employee_name)
        }
      end
    end
  end
end
