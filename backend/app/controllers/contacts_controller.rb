class ContactsController < ApplicationController
  def index
    @q = policy_scope(Contact).ransack(params[:q])
    @contacts = @q.result
    render json: @contacts.map { |contact| ContactSerializer.call(contact) }
  end

  def show
    contact = Contact.find(params[:id])
    authorize contact
    render json: ContactSerializer.call(contact)
  end

  def create
    contact = Contact.new(contact_params)
    authorize contact
    if contact.save
      render json: ContactSerializer.call(contact), status: :created
    else
      render json: { errors: contact.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    contact = Contact.find(params[:id])
    authorize contact
    if contact.update(contact_params)
      render json: ContactSerializer.call(contact)
    else
      render json: { errors: contact.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    contact = Contact.find(params[:id])
    authorize contact
    contact.destroy
    head :no_content
  end

  private

  def contact_params
    params.require(:contact).permit(
      :phone, :phone_type, :carrier, :email, :whatsapp, :telegram, :signal,
      :department, :contactable_id, :contactable_type)
  end
end
