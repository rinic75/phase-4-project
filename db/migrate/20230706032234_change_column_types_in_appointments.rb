class ChangeColumnTypesInAppointments < ActiveRecord::Migration[6.1]
  def change
    change_column :appointments, :golfpro_id, 'integer USING CAST(golfpro_id AS integer)'
    change_column :appointments, :client_id, 'integer USING CAST(client_id AS integer)'
  end
end