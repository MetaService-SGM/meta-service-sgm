# frozen_string_literal: true

class UsersController < ApplicationController
  include ErrorHandler
  include LocaleHandler

  before_action :set_user, only: %i[show update destroy]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render_error(@user)
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render_error(@user)
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_not_found('User')
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation,
      :role,
      :provider,
      :uid,
      :cpf,
      :tipo_contrato,
      :ativo
    )
  end
end
