class GolfproSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :bio

  has_many :appointments
end
