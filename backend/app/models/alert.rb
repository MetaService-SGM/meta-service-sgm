class Alert < ApplicationRecord
  belongs_to :reference, polymorphic: true

  def employee_name
    if reference_type == "Certification"
      reference&.employee&.full_name
    else
      nil
    end
  end
end
