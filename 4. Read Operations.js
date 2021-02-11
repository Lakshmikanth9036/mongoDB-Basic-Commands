//use movieData
db.movies.findOne();
db.movies.find().pretty();
db.movies.find({ name: "The Last Ship" }).pretty();
db.movies.find({ runtime: 60 }).pretty();

/* Comparison */
db.movies.find({ runtime: { $eq: 60 } }).pretty();
db.movies.find({ runtime: { $ne: 60 } }).pretty();
db.movies.find({ runtime: { $lt: 40 } }).pretty();
db.movies.find({ runtime: { $lte: 40 } }).pretty();
db.movies.find({ runtime: { $gt: 40 } }).pretty();
db.movies.find({ runtime: { $gte: 40 } }).pretty();
db.movies.find({ "rating.average": { $gt: 7 } }).pretty();
db.movies.find({ genres: "Drama" }).pretty();
db.movies.find({ genres: ["Drama"] }).pretty();

/* Understanding $in and $nin */
db.movies.find({ runtime: { $in: [30, 42] } }).pretty();
db.movies.find({ runtime: { $nin: [30, 42] } }).pretty();

/* Logical Operator */
/** $or, $nor, $and, $not */
db.movies.find({ "rating.average": { $lt: 5 } }).pretty();
db.movies.find({ "rating.average": { $gt: 9.3 } }).pretty();

db.movies
  .find({
    $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
  })
  .pretty();

db.movies
  .find({
    $nor: [
      { "rating.average": { $lt: 5 } },
      { "rating.average": { $gt: 9.3 } },
    ],
  })
  .pretty();

db.movies
  .find({ $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }] })
  .pretty();
db.movies.find({ "rating.average": { $gt: 9 }, genres: "Drama" }).count();
db.movies.find({ genres: "Drama", genres: "Horror" }).count();
db.movies.find({ $and: [{ genres: "Drama" }, { genres: "Horror" }] }).count();

db.movies.find({ runtime: { $not: { $eq: 60 } } }).count();
db.movies.find({ runtime: { $ne: 60 } }).count();

/* $exists */
db.users.insertMany([
  {
    name: "Max",
    hobbies: [
      { title: "Sports", frequency: 3 },
      { title: "Cooking", frequency: 6 },
    ],
    phone: 0987654321,
  },
  {
    name: "Manuel",
    hobbies: [
      { title: "Cooking", frequency: 5 },
      { title: "Cars", frequency: 2 },
    ],
    phone: "1234567890",
    age: 30,
  },
]);

db.users.find({ age: { $exists: true } }).pretty();
db.users.find({ age: { $exists: true, $gte: 30 } }).pretty();

db.users.insertOne({
  name: "Anna",
  hobbies: [
    { title: "Sports", frequency: 2 },
    { title: "Yoga", frequency: 3 },
  ],
  phone: "65432112345",
  age: null,
});

db.users.find({ age: { $exists: true, $ne: null } }).pretty();

/* $type */
db.users.find({phone: {$type: "number"}}).pretty()
db.users.find({phone: {$type: "double"}}).pretty()
db.users.find({phone: {$type: "string"}}).pretty()
db.users.find({phone: {$type: ["double","string"]}}).pretty()

/* Evaluation */
/* $regex, $expr */
db.movies.find({summary: {$regex: /musical/}}).pretty()

//use financialData
db.sales.insertMany([
    {volume: 100, target: 120},
    {volume: 89, target: 80},
    {volume: 200, target: 177}
])

db.sales.find({$expr: {$gt: ["$volume", "$target"]}}).pretty()
db.sales.find({$expr: {$gt: [{$cond: {if:{$gte: ["$volume",190]}, then: {$subtract: ["$volume", 10]}, else: "$volume"}}, "$target"]}}).pretty()

/* Querying Array */
db.users.find({"hobbies.title": "Sports"}).pretty()

/* $size */
db.users.insertOne({
    name: "Chris",
    hobbies: [
        "Sports",
        "Cooking",
        "Hiking"
    ]
})

db.users.find({hobbies: {$size: 3}}).pretty()

/* $all */
db.movies.find({genres: ["Action", "Thriller"]}).count()
db.movies.find({genres: {$all: ["Action", "Thriller"]}}).count()

/* $elemMatch */
db.users.find({$and: [{"hobbies.title": "Sports"}, {"hobbies.frequency": {$gte: 2}}]}).pretty()
db.users.find({$and: [{"hobbies.title": "Sports"}, {"hobbies.frequency": {$gte: 3}}]}).pretty()
db.users.find({hobbies: {$elemMatch: {title: "Sports", frequency: {$gte: 3}}}} ).pretty()

/* Cursors */
db.movies.find().pretty()
db.movies.find().next()
const dataCursor = db.movies.find()
dataCursor.forEach(movie => {
  printjson(movie)
})
dataCursor.hasNext()

/* sort(), skip(), limit() */
db.movies.find().sort({"rating.average": -1}).pretty()
db.movies.find().sort({"rating.average": 1, runtime: -1}).pretty()
db.movies.find().sort({"rating.average": 1}).skip(10).pretty()
db.movies.find().sort({"rating.average": 1}).skip(100).limit(10).pretty()

/* Projection */
db.movies.find({}, {name: 1, genres: 1, runtime: 1, rating: 1}).pretty()
db.movies.find({}, {_id: 0,name: 1, genres: 1, runtime: 1, rating: 1}).pretty()
db.movies.find({}, {_id: 0,name: 1, genres: 1, runtime: 1, rating: 1, "schedule.time": 1}).pretty()
db.movies.find({genres: "Drama"}, {"genres.$": 1}).pretty()
db.movies.find({genres: {$all: ["Drama", "Horror"]}}, {"genres.$": 1}).pretty()
db.movies.find({genres: "Drama"}, {genres: {$elemMatch: {$eq: "Horror"}} }).pretty()
db.movies.find({"rating.average": {$gt: 9}}, {genres: {$elemMatch: {$eq: "Horror"}} }).pretty()

/* $slice */
db.movies.find({"rating.average": {$gt: 9}}, {genres: {$slice: 2}, name: 1 }).pretty()
db.movies.find({"rating.average": {$gt: 9}}, {genres: {$slice: [1, 2]}, name: 1 }).pretty()