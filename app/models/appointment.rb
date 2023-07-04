class Appointment < ApplicationRecord

  validates :time, presence: true, uniqueness: true
  validates :lesson_info, presence: true, length: { minimum: 5 }

  belongs_to :golfpro
  belongs_to :client
end
