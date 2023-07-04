class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest

  has_many :appointments
end
