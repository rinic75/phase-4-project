class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :golfpro_id, :client_id, :time, :lesson_info
   belongs_to :golfpro
   belongs_to :client
end
