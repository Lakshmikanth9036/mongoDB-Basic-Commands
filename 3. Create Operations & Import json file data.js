//use contactData
db.persons.insertOne({
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
});

db.persons.insertOne({
  name: "Manuel",
  age: 31,
  hobbies: ["Cars", "Cooking"],
});

db.persons.insertMany([
  {
    name: "Anna",
    age: 29,
    hobbies: ["Sports", "Yoga"],
  },
]);

db.persons.insertMany([
  {
    name: "Maria",
    age: 31,
  },
  {
    name: "Chris",
    age: 25,
  },
]);

db.persons.insert({ name: "Phil", age: 35 });

db.persons.insert([
  { name: "Sandeep", age: 28 },
  { name: "Hans", age: 38 },
]);

db.hobbies.insertMany([
  { _id: "sports", name: "Sports" },
  { _id: "cooking", name: "Cooking" },
  { _id: "cars", name: "Cars" },
]);

/* Element will be added before the fail of operation */
db.hobbies.insertMany([
  { _id: "yoga", name: "Yoga" },
  { _id: "cooking", name: "Cooking" },
  { _id: "hiking", name: "Hiking" },
]);

/* How to insert doc even after error */
db.hobbies.insertMany(
  [
    { _id: "yoga", name: "Yoga" },
    { _id: "cooking", name: "Cooking" },
    { _id: "hiking", name: "Hiking" },
  ],
  { ordered: false }
);

/* writeConcern */
db.persons.insertOne(
  {
    name: "Chrissy",
    age: 41,
  },
  {
    writeConcern: { w: 0 },
  }
);

db.persons.insertOne(
  {
    name: "Alex",
    age: 31,
  },
  {
    writeConcern: { w: 1 },
  }
);

db.persons.insertOne(
  {
    name: "Michale",
    age: 51,
  },
  {
    writeConcern: { w: 1, j: false },
  }
);

db.persons.insertOne(
  {
    name: "Michaela",
    age: 51,
  },
  {
    writeConcern: { w: 1, j: true },
  }
);

db.persons.insertOne(
  {
    name: "Aliya",
    age: 22,
  },
  {
    writeConcern: { w: 1, j: true, wtimeout: 1 },
  }
);

/* Import json file data to mongo db server */
//mongoimport tv-shows.json -d movieData -c movies --jsonArray --drop