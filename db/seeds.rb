# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Golfpro.destroy_all
Client.destroy_all
Appointment.destroy_all

5.times do
  Golfpro.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    bio: Faker::Lorem.paragraph(sentence_count: 2),
  )
end

5.times do
  Client.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: "123456",
  )
end

5.times do
  Appointment.create(
    golfpro_id: Golfpro.all.sample.id,
    client_id: Client.all.sample.id,
    time: Faker::Time.between(from: DateTime.now - 1, to: DateTime.now),
    lesson_info: Faker::Lorem.paragraph(sentence_count: 2)
  )
end