// show dbs
// show collections
// use database_name
db.collection_name.find();
db.collection_name.find().pretty();
db.products.insertOne({
  name: "A Computer",
  price: 1999.99,
  description: "A high quality computer.",
  details: { cpu: "Intel i7 8770", memory: 32 },
});
db.flightsData.insertOne({
  departureAirport: "TXL",
  arrivalAirport: "LHR",
  _id: "txl-lhr-1",
});
db.flightsData.deleteOne({ departureAirport: "TXL" });
db.flightsData.deleteMany({ marker: "toDelete" });
db.flightsData.updateOne({ distance: 1200 }, { $set: { marker: "delete" } });
db.flightsData.updateMany({}, { $set: { marker: "toDelete" } });

/*Insert Many*/
db.flightsData.insertMany([
  {
    departureAirport: "MUC",
    arrivalAirport: "SFO",
    aircraft: "Airbus A380",
    distance: 12000,
    intercontinental: true,
  },
  {
    departureAirport: "LHR",
    arrivalAirport: "TXL",
    aircraft: "Airbus A320",
    distance: 950,
    intercontinental: false,
  },
]);
db.passengers.insertMany([
  { name: "Max Schwarzmueller", age: 29 },
  { name: "Manu Lorenz", age: 30 },
  { name: "Chris Hayton", age: 35 },
  { name: "Sandeep Kumar", age: 28 },
  { name: "Maria Jones", age: 30 },
  { name: "Alexandra Maier", age: 27 },
  { name: "Dr. Phil Evans", age: 47 },
  { name: "Sandra Brugge", age: 33 },
  { name: "Elisabeth Mayr", age: 29 },
  { name: "Frank Cube", age: 41 },
  { name: "Karandeep Alun", age: 48 },
  { name: "Michaela Drayer", age: 39 },
  { name: "Bernd Hoftstadt", age: 22 },
  { name: "Scott Tolib", age: 44 },
  { name: "Freddy Melver", age: 41 },
  { name: "Alexis Bohed", age: 35 },
  { name: "Melanie Palace", age: 27 },
  { name: "Armin Glutch", age: 35 },
  { name: "Klaus Arber", age: 53 },
  { name: "Albert Twostone", age: 68 },
  { name: "Gordon Black", age: 38 },
]);

/*Find Operation*/
db.flightsData.find({ name: "Max" });
db.flightsData.find({ intercontinental: true }).pretty();
db.flightsData.find({ distance: 12000 }).pretty();
db.flightsData.find({ distance: { $gt: 10000 } }).pretty();
db.flightsData.findOne({ distance: { $gt: 900 } }).pretty();
db.passengers.find().toArray();
db.passengers.find().forEach((p) => {
  printjson(p);
});
db.passengers.find({}, { name: 1 }).pretty();
db.passengers.find({}, { name: 1, _id: 0 }).pretty();
db.passengers.findOne({ name: "Albert Twostone" }).hobbies;
db.flightsData.find({ "status.description": "on-time" }).pretty();
db.flightsData
  .find({ "status.details.responsible": "Max Schwarzmueller" })
  .pretty();

/*Update Operations*/
db.flightsData.updateOne(
  { _id: ObjectId("5f16e3e52a3b73f07266d338") },
  { $set: { delay: true } }
);
db.flightsData.update(
  { _id: ObjectId("5f16e3e52a3b73f07266d338") },
  { $set: { delay: false } }
);
db.flightsData.update(
  { _id: ObjectId("5f16e3e52a3b73f07266d338") },
  { delay: false }
);
db.flightsData.updateMany(
  {},
  { $set: { status: { description: "on-time", lastUpdate: "1 hour ago" } } }
);

/*Replace*/
db.flightsData.replaceOne(
  { _id: ObjectId("5f16e3e52a3b73f07266d338") },
  {
    departureAirport: "MUC",
    arrivalAirport: "SFO",
    aircraft: "Airbus A380",
    distance: 12000,
    intercontinental: true,
  }
);
