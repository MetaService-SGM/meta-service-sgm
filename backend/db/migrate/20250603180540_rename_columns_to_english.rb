class RenameColumnsToEnglish < ActiveRecord::Migration[7.1]
  def change
    rename_column :addresses, :cep, :zip_code
    rename_column :addresses, :uf, :state
    rename_column :addresses, :municipio, :city
    rename_column :addresses, :bairro, :district
    rename_column :addresses, :logradouro, :street
    rename_column :addresses, :numero, :number
    rename_column :addresses, :complemento, :complement
    rename_column :addresses, :enderecoable_type, :addressable_type
    rename_column :addresses, :enderecoable_id, :addressable_id

    rename_column :certifications, :nome, :name
    rename_column :certifications, :data_emissao, :issue_date
    rename_column :certifications, :validade, :expiration_date
    rename_column :certifications, :colaborador_id, :employee_id
    rename_column :certifications, :cargo_id, :position_id

    rename_column :clients, :nome, :name
    rename_column :clients, :endereco, :address
    rename_column :clients, :telefone, :phone

    rename_column :companies, :inscricao_estadual, :state_registration
    rename_column :companies, :inscricao_municipal, :municipal_registration
    rename_column :companies, :razao_social, :corporate_name
    rename_column :companies, :nome_fantasia, :trade_name
    rename_column :companies, :segmento, :business_segment

    rename_column :contacts, :telefone, :phone
    rename_column :contacts, :contatoable_type, :contactable_type
    rename_column :contacts, :contatoable_id, :contactable_id
    rename_column :contacts, :tipo_telefone, :phone_type
    rename_column :contacts, :departamento, :department
    rename_column :contacts, :operadora, :carrier

    rename_column :contract_materials, :quantidade_solicitada, :requested_quantity
    rename_column :contract_materials, :quantidade_utilizada, :used_quantity
    rename_column :contract_materials, :quantidade_devolvida, :returned_quantity
    rename_column :contract_materials, :data_entrega, :delivery_date
    rename_column :contract_materials, :data_devolucao, :return_date
    rename_column :contract_materials, :observacao, :note
    rename_column :contract_materials, :id_contrato_geral, :general_contract_id
    rename_column :contract_materials, :id_material, :material_id

    rename_column :departments, :nome, :name

    rename_column :dependents, :nome, :full_name
    rename_column :dependents, :parentesco, :kinship
    rename_column :dependents, :data_nascimento, :birth_date
    rename_column :dependents, :colaborador_id, :employee_id

    rename_column :emergency_contacts, :nome, :full_name
    rename_column :emergency_contacts, :telefone, :phone
    rename_column :emergency_contacts, :parentesco, :kinship
    rename_column :emergency_contacts, :colaborador_id, :employee_id
    rename_column :emergency_contacts, :operadora, :carrier

    rename_column :employee_contracts, :tipo_contrato, :contract_type
    rename_column :employee_contracts, :unidade, :unit
    rename_column :employee_contracts, :turno, :shift
    rename_column :employee_contracts, :moeda, :currency
    rename_column :employee_contracts, :salario_hora, :hourly_wage
    rename_column :employee_contracts, :data_admissao, :admission_date
    rename_column :employee_contracts, :periodo_experiencia, :trial_period
    rename_column :employee_contracts, :matricula, :registration_number
    rename_column :employee_contracts, :superior_direto, :direct_supervisor
    rename_column :employee_contracts, :grau_hierarquico, :hierarchy_level
    rename_column :employee_contracts, :data_contrato, :contract_date
    rename_column :employee_contracts, :duracao_contrato, :contract_duration
    rename_column :employee_contracts, :vencimento_contrato, :contract_expiration
    rename_column :employee_contracts, :total_dias, :total_days
    rename_column :employee_contracts, :colaborador_id, :employee_id
    rename_column :employee_contracts, :cargo_id, :position_id
    rename_column :employee_contracts, :departamento_id, :department_id
    rename_column :employee_contracts, :data_inicio, :start_date
    rename_column :employee_contracts, :data_fim, :end_date
    rename_column :employee_contracts, :quantidade_horas, :total_hours

    rename_column :employees, :nome, :first_name
    rename_column :employees, :nome_completo, :full_name
    rename_column :employees, :nome_social, :social_name
    rename_column :employees, :funcao, :function
    rename_column :employees, :genero, :gender
    rename_column :employees, :data_nasc, :birth_date
    rename_column :employees, :cor_ou_raca, :ethnicity
    rename_column :employees, :estado_civil, :marital_status
    rename_column :employees, :pais, :country
    rename_column :employees, :nacionalidade, :nationality
    rename_column :employees, :situacao, :status
    rename_column :employees, :escolaridade, :education_level
    rename_column :employees, :altura, :height
    rename_column :employees, :peso, :weight

    rename_column :general_contracts, :descricao_servico, :service_description
    rename_column :general_contracts, :responsavel, :responsible
    rename_column :general_contracts, :data_inicio, :start_date
    rename_column :general_contracts, :data_fim, :end_date
    rename_column :general_contracts, :valor, :value
    rename_column :general_contracts, :id_prestador, :provider_id
    rename_column :general_contracts, :id_cliente, :client_id
    rename_column :general_contracts, :id_servico, :service_id

    rename_column :materials, :nome, :name
    rename_column :materials, :categoria, :category
    rename_column :materials, :unidade_medida, :unit_of_measure
    rename_column :materials, :quantidade_minima, :minimum_quantity
    rename_column :materials, :quantidade_atual, :current_quantity
    rename_column :materials, :certif_aprov, :approval_certificate
    rename_column :materials, :tipo, :material_type
    rename_column :materials, :cor, :color
    rename_column :materials, :tamanho, :size
    rename_column :materials, :cod_int, :internal_code

    rename_column :positions, :nome, :name

    rename_column :providers, :nome, :name
    rename_column :providers, :endereco, :address
    rename_column :providers, :telefone, :phone

    rename_column :services, :nome, :name
    rename_column :services, :categoria, :category

    rename_column :users, :tipo_contrato, :contract_type
    rename_column :users, :ativo, :active 
  end
end
