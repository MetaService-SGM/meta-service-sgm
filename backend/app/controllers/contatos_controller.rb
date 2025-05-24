class ContatosController < ApplicationController
  def index
    @q = policy_scope(Contato).ransack(params[:q])
    @contatos = @q.result
    render json: @contatos.map { |contato| ContatoSerializer.call(contato) }
  end

  def show
    contato = Contato.find(params[:id])
    authorize contato
    render json: ContatoSerializer.call(contato)
  end

  def create
    contato = Contato.new(contato_params)
    authorize contato
    if contato.save
      render json: ContatoSerializer.call(contato), status: :created
    else
      render json: { errors: contato.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    contato = Contato.find(params[:id])
    authorize contato
    if contato.update(contato_params)
      render json: ContatoSerializer.call(contato)
    else
      render json: { errors: contato.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    contato = Contato.find(params[:id])
    authorize contato
    contato.destroy
    head :no_content
  end

  private

  def contato_params
    params.require(:contato).permit(:numero, :email, :whatsapp, :telegram, :signal, :contatoable_id, :contatoable_type)
  end
end
