class CompaniesController < ApplicationController
  def index
    @q = policy_scope(Company).ransack(params[:q])
    @companies = @q.result
    authorize Company
    render json: @companies.map { |e| CompanySerializer.call(e) }
  end

  def show
    authorize @company
    render json: CompanySerializer.call(@company)
  end

  def create
    @company = Company.new(company_params)
    authorize @company
    if @company.save
      render json: CompanySerializer.call(@company), status: :created
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    authorize @company
    if @company.update(company_params)
      render json: CompanySerializer.call(@company)
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @company
    @company.destroy
    head :no_content
  end

  private

  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:cnpj, :state_registration, :municipal_registration, :corporate_name, :trade_name, :business_segment)
  end
end
