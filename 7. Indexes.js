// mongoimport persons.json -d contactData -c contacts --jsonArray
db.contacts.find({ "dob.age": { $gt: 60 } }).pretty();
db.contacts.explain().find({ "dob.age": { $gt: 60 } });
db.contacts.explain("executionStats").find({ "dob.age": { $gt: 60 } });

db.contacts.createIndex({ "dob.age": 1 });
db.contacts.dropIndex({ "dob.age": 1 });

db.contacts.createIndex({ gender: 1 });
db.contacts.explain("executionStats").find({ gender: "male" });
db.contacts.dropIndex({ gender: 1 });

db.contacts.createIndex({ "dob.age": 1, gender: 1 });
db.contacts
  .explain("executionStats")
  .find({ "dob.age": { $gt: 60 }, gender: "male" });

/* Indexes for Sorting */
db.contacts
  .explain()
  .find({ "dob.age": { $gt: 35 } })
  .sort({ gender: 1 });

db.contacts.getIndexes();

db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
);

db.contacts.find({ "dob.age": { $gt: 60 } }).pretty();
db.contacts.explain().find({ "dob.age": { $gt: 60 } });
db.contacts.explain().find({ "dob.age": { $gt: 60 }, gender: "male" });

db.users.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);

db.sessions.insertOne({ data: "sdjg", createdAt: new Date() });
db.session.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 });

/* Covered Queries */
db.customers.insertMany([
  { name: "Max", age: 29, salary: 3000000 },
  { name: "Manu", age: 30, salary: 2000000 },
]);
db.customers.createIndex({ name: 1 });
db.customers.explain("executionStats").find({ name: "Max" });
db.customers
  .explain("executionStats")
  .find({ name: "Max" }, { _id: 0, name: 1 });

/* Reject Plan */
db.customers.createIndex({ age: 1, name: 1 });
db.customers.explain().find({ name: "Max", age: 30 });

db.customers.explain("allPlansExecution").find({ name: "Max", age: 30 });
