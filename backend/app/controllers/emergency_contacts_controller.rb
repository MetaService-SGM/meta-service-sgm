class EmergencyContactsController < ApplicationController
  before_action :set_emergency_contact, only: [:show, :update, :destroy]

  # GET /emergency_contact
  def index
    @contacts = EmergencyContact.all
    render json: @contacts
  end

  # GET /emergency_contact/:id
  def show
    render json: @emergency_contact
  end

  # POST /emergency_contact
  def create
    @emergency_contact = EmergencyContact.new(emergency_contact_params)

    if @emergency_contact.save
      render json: @emergency_contact, status: :created
    else
      render json: @emergency_contact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /emergency_contact/:id
  def update
    if @emergency_contact.update(emergency_contact_params)
      render json: @emergency_contact
    else
      render json: @emergency_contact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /emergency_contact/:id
  def destroy
    @emergency_contact.destroy
    head :no_content
  end

  private

  def set_emergency_contact
    @emergency_contact = EmergencyContact.find(params[:id])
  end

  def emergency_contact_params
    params.require(:emergency_contact).permit(:employee_id, :full_name, :phone, :carrier, :kinship)
  end
end