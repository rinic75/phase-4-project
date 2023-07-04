class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.string :golfpro_id
      t.string :client_id
      t.datetime :time
      t.string :lesson_info

      t.timestamps
    end
  end
end
