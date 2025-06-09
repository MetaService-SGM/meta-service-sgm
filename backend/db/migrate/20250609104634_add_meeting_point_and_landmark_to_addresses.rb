class AddMeetingPointAndLandmarkToAddresses < ActiveRecord::Migration[7.1]
  def change
    add_column :addresses, :meeting_point, :string
    add_column :addresses, :landmark, :string
  end
end
