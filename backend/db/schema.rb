# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_04_18_005142) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clientes", force: :cascade do |t|
    t.string "nome"
    t.string "cnpj"
    t.string "endereco"
    t.string "telefone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "colaboradors", force: :cascade do |t|
    t.string "nome"
    t.string "cpf"
    t.string "cbo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contrato_colaboradors", force: :cascade do |t|
    t.datetime "data_inicio"
    t.datetime "data_fim"
    t.float "quantidade_horas"
    t.float "valor_hora"
    t.integer "id_contrato_geral"
    t.integer "id_colaborador"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contrato_gerals", force: :cascade do |t|
    t.string "descricao_servico"
    t.string "responsavel"
    t.datetime "data_inicio"
    t.datetime "data_fim"
    t.float "valor"
    t.integer "id_prestador"
    t.integer "id_cliente"
    t.integer "id_servico"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "entrega_epis", force: :cascade do |t|
    t.datetime "data_entrega"
    t.datetime "data_devolucao"
    t.string "observacao"
    t.integer "id_epi"
    t.integer "id_colaborador"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "epis", force: :cascade do |t|
    t.string "nome"
    t.string "categoria"
    t.string "ca"
    t.string "tipo"
    t.integer "qtdMinima"
    t.integer "qtdAtual"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "material_contratos", force: :cascade do |t|
    t.float "quantidade_solicitada"
    t.float "quantidade_utilizada"
    t.float "quantidade_devolvida"
    t.datetime "data_entrega"
    t.datetime "data_devolucao"
    t.string "observacao"
    t.integer "id_contrato_geral"
    t.integer "id_material"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "materials", force: :cascade do |t|
    t.string "nome"
    t.string "categoria"
    t.string "unidade_medida"
    t.float "quantidade_minima"
    t.float "quantidade_atual"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prestadors", force: :cascade do |t|
    t.string "nome"
    t.string "cnpj"
    t.string "endereco"
    t.string "telefone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "servicos", force: :cascade do |t|
    t.string "nome"
    t.string "categoria"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.integer "role"
    t.string "cpf"
    t.string "tipo_contrato"
    t.boolean "ativo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
