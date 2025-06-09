class AddressesController < ApplicationController
  before_action :set_address, only: %i[show update destroy]

  def index
    authorize Address
    @q = Address.ransack(params[:q])
    @addresses = @q.result
    render json: @addresses.map { |e| AddressSerializer.call(e) rescue nil }.compact
  end

  def show
    authorize @address
    render_success(AddressSerializer.call(@address))
  end

  def create
    @address = Address.new(address_params)
    authorize @address
    @address.save!
    render_success(AddressSerializer.call(@address), status: :created)
  end

  def update
    authorize @address
    @address.update!(address_params)
    render_success(AddressSerializer.call(@address))
  end

  def destroy
    authorize @address
    @address.destroy!
    head :no_content
  end

  private

  def set_address
    @address = Address.find(params[:id])
  end

  def address_params
    params.require(:address).permit(
      :zip_code,
      :state,
      :city,
      :district,
      :street,
      :number,
      :complement,
      :meeting_point,
      :landmark,
      :addressable_type,
      :addressable_id
    )
  end
end
