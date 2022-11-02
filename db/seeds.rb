# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

5.times do
  Event.create!(
    user_id: User.all.map{|user| user.id}.sample(),
    title: "Fun times",
    location: "Brooklyn, NY",
    party_size: 4,
    what: Faker::Food.description,
    when: Faker::Time.between_dates(from: Date.today, to: Date.today + 300, period: :all),
    why: Faker::Lorem.sentence,
  )
end