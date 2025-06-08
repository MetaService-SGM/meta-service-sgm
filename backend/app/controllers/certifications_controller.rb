class CertificationsController < ApplicationController
  before_action :set_certification, only: [:show, :update, :destroy]
  before_action :authorize_certification, only: [:show, :update, :destroy]
  before_action :authorize_collection, only: [:index, :create]

  def index
    certifications = policy_scope(Certification).ransack(params[:q]).result
    render json: certifications.map(&CertificationSerializer.method(:call))
  end

  def show
    render json: CertificationSerializer.call(@certification)
  end

  def create
    certification = Certification.new(certification_params)
    authorize certification

    if certification.save
      render json: CertificationSerializer.call(certification), status: :created
    else
      puts certification.errors.full_messages
      render json: { errors: certification.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def update
    @certification.update!(certification_params)
    render json: CertificationSerializer.call(@certification)
  end

  def destroy
    @certification.destroy!
    head :no_content
  end

  private

  def set_certification
    @certification = Certification.find(params[:id])
  end

  def certification_params
    params.require(:certification).permit(:name, :issue_date, :expiration_date, :employee_id, :position_id, :pdf)
  end

  def authorize_certification
    authorize @certification
  end

  def authorize_collection
    authorize Certification
  end
end
