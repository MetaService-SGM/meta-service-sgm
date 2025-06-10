class DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :update, :destroy]

  def index
    @documents = Document.all
    render json: @documents
  end

  def show
    render json: @document
  end

  def create
    @document = Document.new(document_params)

    if @document.save
      render json: @document, status: :created
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  def update
    if @document.update(document_params)
      render json: @document
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @document.destroy
    head :no_content
  end

  private

  def set_document
    @document = Document.find(params[:id])
  end

  def document_params
    params.require(:document).permit(
      :tipo,
      :numero,
      :orgao_emissor,
      :data_emissao,
      :employee_id
    )
  end
end
