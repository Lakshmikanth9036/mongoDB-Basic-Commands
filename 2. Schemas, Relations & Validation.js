// use shop

/* Mid approach */
db.products.insertOne({ name: "A book", price: 12.99 });
db.products.insertOne({ name: "A T-Shirt", price: 20.99 });
db.products.insertOne({
  name: "A Computer",
  price: 1999.99,
  details: { cpu: "Intel i7 8770" },
});
db.products.deleteMany({});

/* SQL approach */
db.products.insertOne({ name: "A book", price: 12.99, details: null });
db.products.insertOne({ name: "A T-Shirt", price: 20.99, deatils: null });

/* Datatypes */
db.companies.insertOne({
  name: "Fresh Apples Inc",
  isStartup: true,
  employees: 33,
  funding: 12345678900987654321,
  details: {
    ceo: "Mark Super",
    tags: [{ title: "super" }, { title: "perfect" }],
  },
  foundingDate: new Date(),
  insertedAt: new Timestamp(),
});

/* One-To-One Relation */
db.patients.insertOne({
  name: "Max",
  age: 29,
  diseaseSummary: "summary-max-1",
});

db.diseaseSummaries.insertOne({
  _id: "summary-max-1",
  diseases: ["cold", "broken leg"],
});

var dsid = db.patients.findOne().diseaseSummary;

db.diseaseSummaries.findOne({ _id: dsid });

/* One-To-One Relation is good place to go with embedded objects or array */
db.patients.insertOne({
  name: "Max",
  age: 29,
  diseaseSummary: { diseases: ["cold", "broken leg"] },
});

// use cardData
db.persons.insertOne({
  name: "Max",
  car: {
    model: "BMW",
    price: 40000,
  },
});
db.persons.insertOne({
  name: "Max",
  age: 29,
  salary: 3000,
});
db.cars.insertOne({
  model: "BMW",
  price: 40000,
  owner: ObjectId("5f195c7d2a3b73f07266d35d"),
});

/* One-To-Many Relation */
db.questionThreads.insertOne({
  creator: "Max",
  questions: "How does that all work?",
  answers: ["q1a1", "q1a2"],
});
db.answers.insertMany([
  {
    _id: "q1a1",
    text: "It works like that.",
  },
  { _id: "q1a2", text: "Thanks!" },
]);

db.questionThreads.insertOne({
  creator: "Max",
  questions: "How does that all work?",
  answers: [{ text: "It works like that." }, { text: "Thanks!" }],
});

db.cities.insertOne({
  name: "New York City",
  coordinates: {
    lat: 21,
    lng: 55,
  },
});

db.citizens.insertMany([
  {
    name: "Max Schwarzmueller",
    cityId: ObjectId("5f196c782a3b73f07266d361"),
  },
  { name: "Manuel Lorenz", cityId: ObjectId("5f196c782a3b73f07266d361") },
]);

/* Many-To-Many Relation */
db.products.insertOne({
  title: "A book",
  price: 12.99,
});
db.customers.insertOne({
  name: "Max",
  age: 29,
});
db.orders.insertOne({
  productId: ObjectId("5f196dca2a3b73f07266d364"),
  customerId: ObjectId("5f196df62a3b73f07266d365"),
});

db.books.insertOne({
  name: "My favorite Book",
  authors: [
    { name: "Max Schwarz", age: 29 },
    { name: "Manuel Lor", age: 30 },
  ],
});

db.authors.insertMany([
  { name: "Max Schwarz", age: 29, address: { street: "Main" } },
  { name: "Manuel Lor", age: 30, address: { street: "Tree" } },
]);

db.books.updateOne(
  {},
  {
    $set: {
      authors: [
        ObjectId("5f1971902a3b73f07266d367"),
        ObjectId("5f1971902a3b73f07266d368"),
      ],
    },
  }
);

db.books
  .aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "authors",
        foreignField: "_id",
        as: "creators",
      },
    },
  ])
  .pretty();

/* Simple project db */
db.users.insertMany([
  { name: "Max Schwarzmueller", age: 29, email: "max@gmail.com" },
  { name: "Manule Lorenz", age: 30, email: "manu@test.com" },
]);
db.posts.insertOne({
  title: "My first Post!",
  text: "This is my first post, I hope you like it!",
  tags: ["new", "tech"],
  creator: ObjectId("5f198f7f2a3b73f07266d36a"),
  comments: [
    { text: "I like this post!", author: ObjectId("5f198f7f2a3b73f07266d369") },
  ],
});

/* Validation */
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be a objectId and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be a string and is required",
              },
            },
          },
        },
      },
    },
  },
});

db.runCommand({
  collMod: "posts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be a objectId and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be a string and is required",
              },
            },
          },
        },
      },
    },
  },
  validationAction: "warn"
});
