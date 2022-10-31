# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Creating questions..."

questions = Question.create([
  {
    title: 'How will the Solar System end?',
    tag: 'astronomy',
  },
  {
    title: 'How will the end of the universe be?',
    tag: 'astronomy',
  },
  {
    title: 'How did life start on Earth?',
    tag: 'biology',
  },
  {
    title: 'What was there before the Big Bang?',
    tag: 'physics',
  },
  {
    title: 'What do we already know about the ocean floor?',
    tag: 'science',
  }
])

puts "Questions created!"
