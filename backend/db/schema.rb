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

ActiveRecord::Schema[7.1].define(version: 2025_05_25_034459) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "cargos", force: :cascade do |t|
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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
    t.index ["cpf"], name: "index_colaboradors_on_cpf", unique: true
  end

  create_table "contatos", force: :cascade do |t|
    t.string "numero"
    t.string "email"
    t.string "whatsapp"
    t.string "telegram"
    t.string "signal"
    t.string "contatoable_type", null: false
    t.bigint "contatoable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contatoable_type", "contatoable_id"], name: "index_contatos_on_contatoable"
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

  create_table "dados_contratos", force: :cascade do |t|
    t.string "tipo_contrato"
    t.string "unidade"
    t.string "turno"
    t.string "moeda"
    t.decimal "salario", precision: 10, scale: 2
    t.date "data_admissao"
    t.integer "periodo_experiencia"
    t.string "matricula"
    t.string "superior_direto"
    t.string "grau_hierarquico"
    t.date "data_contrato"
    t.integer "duracao_contrato"
    t.date "vencimento_contrato"
    t.integer "total_dias"
    t.bigint "colaborador_id", null: false
    t.bigint "cargo_id", null: false
    t.bigint "departamento_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cargo_id"], name: "index_dados_contratos_on_cargo_id"
    t.index ["colaborador_id"], name: "index_dados_contratos_on_colaborador_id"
    t.index ["departamento_id"], name: "index_dados_contratos_on_departamento_id"
  end

  create_table "departamentos", force: :cascade do |t|
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dependentes", force: :cascade do |t|
    t.string "nome"
    t.string "parentesco"
    t.date "data_nascimento"
    t.bigint "colaborador_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["colaborador_id"], name: "index_dependentes_on_colaborador_id"
  end

  create_table "empresas", force: :cascade do |t|
    t.string "cnpj"
    t.string "inscricao_estadual"
    t.string "inscricao_municipal"
    t.string "razao_social"
    t.string "nome_fantasia"
    t.string "segmento"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cnpj"], name: "index_empresas_on_cnpj", unique: true
  end

  create_table "enderecos", force: :cascade do |t|
    t.string "ponto_referencia"
    t.string "ponto_encontro"
    t.string "cep"
    t.string "uf"
    t.string "municipio"
    t.string "bairro"
    t.string "logradouro"
    t.string "numero"
    t.string "complemento"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "enderecoable_type", null: false
    t.bigint "enderecoable_id", null: false
    t.index ["enderecoable_type", "enderecoable_id"], name: "index_enderecos_on_enderecoable"
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
    t.string "certif_aprov"
    t.string "tipo"
    t.string "cor"
    t.string "tamanho"
    t.integer "cod_int"
    t.index ["cod_int"], name: "index_materials_on_cod_int", unique: true
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
    t.index ["cpf"], name: "index_users_on_cpf", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "contrato_colaboradors", "colaboradors", column: "id_colaborador"
  add_foreign_key "dados_contratos", "cargos"
  add_foreign_key "dados_contratos", "colaboradors"
  add_foreign_key "dados_contratos", "departamentos"
  add_foreign_key "dependentes", "colaboradors"
  add_foreign_key "entrega_epis", "epis"
end
