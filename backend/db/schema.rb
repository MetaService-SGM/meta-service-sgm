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

ActiveRecord::Schema[7.1].define(version: 2025_05_19_233719) do
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
    t.string "nome_completo", limit: 100
    t.string "nome_social", limit: 50
    t.string "funcao", limit: 50
    t.string "genero", limit: 20
    t.date "data_nasc"
    t.string "cor_ou_raca", limit: 30
    t.string "estado_civil", limit: 20
    t.string "pais", limit: 50
    t.string "nacionalidade", limit: 50
    t.string "situacao", limit: 20
    t.string "escolaridade", limit: 20
    t.decimal "altura", precision: 4, scale: 2
    t.decimal "peso", precision: 5, scale: 2
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
    t.string "tipo_contrato", limit: 20
    t.string "unidade", limit: 100
    t.string "turno", limit: 50
    t.string "moeda", limit: 15
    t.decimal "salario", precision: 10, scale: 2
    t.date "data_admissao"
    t.integer "periodo_experiencia"
    t.string "matricula", limit: 20, null: false
    t.string "superior_direto", limit: 100
    t.string "grau_hierarquico", limit: 50
    t.date "data_contrato"
    t.integer "duracao_contrato"
    t.date "vencimento_contrato"
    t.integer "total_dias"
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
    t.bigint "epi_id", null: false
    t.index ["epi_id"], name: "index_entrega_epis_on_epi_id"
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
    t.integer "role"
    t.string "cpf"
    t.string "tipo_contrato"
    t.boolean "ativo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.json "tokens"
    t.boolean "allow_password_change", default: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "remember_created_at"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "contrato_colaboradors", "colaboradors", column: "id_colaborador"
  add_foreign_key "entrega_epis", "epis"
end
