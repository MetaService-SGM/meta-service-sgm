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

ActiveRecord::Schema[7.1].define(version: 2025_06_13_124808) do
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

  create_table "addresses", force: :cascade do |t|
    t.string "zip_code"
    t.string "state"
    t.string "city"
    t.string "district"
    t.string "street"
    t.string "number"
    t.string "complement"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.string "meeting_point"
    t.string "landmark"
    t.index ["addressable_type", "addressable_id"], name: "index_enderecos_on_enderecoable"
  end

  create_table "alerts", force: :cascade do |t|
    t.string "category"
    t.string "message"
    t.boolean "resolved", default: false
    t.string "reference_type"
    t.integer "reference_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "asos", force: :cascade do |t|
    t.boolean "fit_for_activity"
    t.date "issued_at"
    t.date "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "employee_contract_id", null: false
    t.index ["employee_contract_id"], name: "index_asos_on_employee_contract_id"
  end

  create_table "certifications", force: :cascade do |t|
    t.string "name", limit: 100
    t.date "issue_date"
    t.date "expiration_date"
    t.bigint "employee_id", null: false
    t.bigint "position_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_certifications_on_employee_id"
    t.index ["position_id"], name: "index_certifications_on_position_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.string "cnpj"
    t.string "address"
    t.string "phone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", force: :cascade do |t|
    t.string "cnpj"
    t.string "state_registration"
    t.string "municipal_registration"
    t.string "corporate_name"
    t.string "trade_name"
    t.string "business_segment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cnpj"], name: "index_companies_on_cnpj", unique: true
  end

  create_table "contacts", force: :cascade do |t|
    t.string "phone"
    t.string "email"
    t.string "whatsapp"
    t.string "telegram"
    t.string "signal"
    t.string "contactable_type", null: false
    t.bigint "contactable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "phone_type"
    t.string "department"
    t.string "carrier"
    t.index ["contactable_type", "contactable_id"], name: "index_contatos_on_contatoable"
  end

  create_table "contract_materials", force: :cascade do |t|
    t.float "requested_quantity"
    t.float "used_quantity"
    t.float "returned_quantity"
    t.datetime "delivery_date"
    t.datetime "return_date"
    t.string "note"
    t.integer "general_contract_id"
    t.integer "material_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dependents", force: :cascade do |t|
    t.string "full_name"
    t.string "kinship"
    t.date "birth_date"
    t.bigint "employee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_dependents_on_employee_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "tipo"
    t.string "numero"
    t.string "orgao_emissor"
    t.date "data_emissao"
    t.bigint "employee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_documents_on_employee_id"
  end

  create_table "emergency_contacts", force: :cascade do |t|
    t.string "full_name"
    t.string "phone"
    t.string "kinship"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "employee_id", null: false
    t.string "carrier"
    t.index ["employee_id"], name: "index_emergency_contacts_on_employee_id"
  end

  create_table "employee_contracts", force: :cascade do |t|
    t.string "contract_type"
    t.string "unit"
    t.string "shift"
    t.string "currency"
    t.decimal "hourly_wage", precision: 10, scale: 2
    t.date "admission_date"
    t.integer "trial_period"
    t.string "registration_number"
    t.string "direct_supervisor"
    t.string "hierarchy_level"
    t.date "contract_date"
    t.integer "contract_duration"
    t.date "contract_expiration"
    t.integer "total_days"
    t.bigint "employee_id", null: false
    t.bigint "position_id", null: false
    t.bigint "department_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start_date"
    t.datetime "end_date"
    t.float "total_hours"
    t.index ["department_id"], name: "index_employee_contracts_on_department_id"
    t.index ["employee_id"], name: "index_employee_contracts_on_employee_id"
    t.index ["position_id"], name: "index_employee_contracts_on_position_id"
  end

  create_table "employees", force: :cascade do |t|
    t.string "first_name"
    t.string "cpf"
    t.string "cbo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "full_name", limit: 100
    t.string "social_name", limit: 50
    t.string "function", limit: 50
    t.string "gender", limit: 20
    t.date "birth_date"
    t.string "ethnicity", limit: 30
    t.string "marital_status", limit: 20
    t.string "country", limit: 50
    t.string "nationality", limit: 50
    t.string "status", limit: 20
    t.string "education_level", limit: 30
    t.decimal "height", precision: 4, scale: 2
    t.decimal "weight", precision: 5, scale: 2
    t.index ["cpf"], name: "index_employees_on_cpf", unique: true
  end

  create_table "general_contracts", force: :cascade do |t|
    t.string "service_description"
    t.string "responsible"
    t.datetime "start_date"
    t.datetime "end_date"
    t.float "value"
    t.integer "provider_id"
    t.integer "client_id"
    t.integer "service_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "materials", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.string "unit_of_measure"
    t.float "minimum_quantity"
    t.float "current_quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "approval_certificate"
    t.string "material_type"
    t.string "color"
    t.string "size"
    t.integer "internal_code"
    t.index ["internal_code"], name: "index_materials_on_internal_code", unique: true
  end

  create_table "positions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "providers", force: :cascade do |t|
    t.string "name"
    t.string "cnpj"
    t.string "address"
    t.string "phone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stock_movements", force: :cascade do |t|
    t.bigint "material_id", null: false
    t.bigint "work_order_id", null: false
    t.integer "movement_type"
    t.float "quantity"
    t.datetime "moved_at"
    t.bigint "employee_id", null: false
    t.text "notes"
    t.bigint "approver_id"
    t.bigint "rollback_from_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["approver_id"], name: "index_stock_movements_on_approver_id"
    t.index ["employee_id"], name: "index_stock_movements_on_employee_id"
    t.index ["material_id"], name: "index_stock_movements_on_material_id"
    t.index ["rollback_from_id"], name: "index_stock_movements_on_rollback_from_id"
    t.index ["work_order_id"], name: "index_stock_movements_on_work_order_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.integer "role"
    t.string "cpf"
    t.string "contract_type"
    t.boolean "active"
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

  create_table "work_order_employees", force: :cascade do |t|
    t.bigint "work_order_id", null: false
    t.bigint "employee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_work_order_employees_on_employee_id"
    t.index ["work_order_id"], name: "index_work_order_employees_on_work_order_id"
  end

  create_table "work_order_materials", force: :cascade do |t|
    t.bigint "work_order_id", null: false
    t.bigint "material_id", null: false
    t.float "quantity"
    t.float "returned_quantity", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["material_id"], name: "index_work_order_materials_on_material_id"
    t.index ["work_order_id"], name: "index_work_order_materials_on_work_order_id"
  end

  create_table "work_orders", force: :cascade do |t|
    t.string "client_order_number"
    t.date "opened_at"
    t.date "started_at"
    t.date "expected_end_at"
    t.integer "status", default: 0
    t.integer "priority", default: 1
    t.string "requester_name"
    t.string "requester_department"
    t.string "requester_contact"
    t.string "responsible"
    t.text "notes"
    t.integer "expected_days"
    t.decimal "value", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "asos", "employee_contracts"
  add_foreign_key "certifications", "employees"
  add_foreign_key "certifications", "positions"
  add_foreign_key "dependents", "employees"
  add_foreign_key "documents", "employees"
  add_foreign_key "emergency_contacts", "employees"
  add_foreign_key "employee_contracts", "departments"
  add_foreign_key "employee_contracts", "employees"
  add_foreign_key "employee_contracts", "positions"
  add_foreign_key "stock_movements", "employees"
  add_foreign_key "stock_movements", "materials"
  add_foreign_key "stock_movements", "stock_movements", column: "rollback_from_id"
  add_foreign_key "stock_movements", "users", column: "approver_id"
  add_foreign_key "stock_movements", "work_orders"
  add_foreign_key "work_order_employees", "employees"
  add_foreign_key "work_order_employees", "work_orders"
  add_foreign_key "work_order_materials", "materials"
  add_foreign_key "work_order_materials", "work_orders"
end
