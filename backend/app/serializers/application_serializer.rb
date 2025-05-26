class ApplicationSerializer
    def self.serialize_timestamps(record)
      {
        created_at: record.respond_to?(:created_at) && record.created_at.present? ? record.created_at.strftime('%d/%m/%Y %H:%M') : nil,
        updated_at: record.respond_to?(:updated_at) && record.updated_at.present? ? record.updated_at.strftime('%d/%m/%Y %H:%M') : nil
      }
    end
  end
