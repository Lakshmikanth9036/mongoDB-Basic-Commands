/* updateOne(), updateMany() and $set */
db.users.updateOne(
  { _id: ObjectId("5f1e73d300a1142a3782dcaa") },
  {
    $set: {
      hobbies: [
        { title: "Sports", frequency: 5 },
        { title: "Cooking", frequency: 3 },
        { title: "Hiking", frequency: 1 },
      ],
    },
  }
);
db.users.find({ "hobbies.title": "Sports" }).pretty();
db.users.updateMany(
  { "hobbies.title": "Sports" },
  { $set: { isSporty: true } }
);
db.users.updateOne(
  { _id: ObjectId("5f1e73d300a1142a3782dcaa") },
  { $set: { age: 40, phone: 9876543211 } }
);

/* Incrementing and Decrementing value */
db.users.updateOne({ name: "Manuel" }, { $inc: { age: 2 } });
db.users.updateOne({ name: "Manuel" }, { $inc: { age: -2 } });
db.users.updateOne(
  { name: "Manuel" },
  { $inc: { age: 4 }, $set: { isSporty: false } }
);

/* $min, $max and $mul */
db.users.updateOne({ name: "Chris" }, { $min: { age: 35 } });
db.users.updateOne({ name: "Chris" }, { $max: { age: 38 } });
db.users.updateOne({ name: "Chris" }, { $mul: { age: 1.1 } });

/* Getting Rid of Fields using $unset and Rename fields using $rename*/
db.users.updateMany({ isSporty: true }, { $unset: { phone: "" } });
db.users.updateMany({}, { $rename: { age: "totalAge" } });

/* upset */
db.users.updateOne(
  { name: "Maria" },
  {
    $set: {
      age: 29,
      hobbies: [{ title: "Good food", frequency: 3 }],
      isSporty: true,
    },
  },
  { upsert: true }
);

/* Array */
db.users
  .find({
    $and: [{ "hobbies.title": "Sports" }, { "hobbies.frequency": { $gte: 3 } }],
  })
  .pretty();

db.users
  .find({
    hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } },
  })
  .pretty();

db.users.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.$.highFrequency": true } }
);

db.users.find({ "hobbies.frequency": { $gt: 2 } }).pretty();
db.users.updateMany(
  { "hobbies.frequency": { $gt: 2 } },
  { $set: { "hobbies.$.goodFrequency": true } }
);

db.users.updateMany(
  { totalAge: { $gt: 30 } },
  { $inc: { "hobbies.$[].frequency": -1 } }
);

/* Finding and updating Specific fields */
db.users.updateMany(
  { "hobbies.frequency": { $gt: 2 } },
  { $set: { "hobbies.$[el].goodFrequency": true } },
  { arrayFilters: [{ "el.frequency": { $gt: 2 } }] }
);

/* Adding elements to Arrays $push add duplicate element if execut multiple time's */
db.users.updateOne(
  { name: "Maria" },
  { $push: { hobbies: { tilte: "Sports", frequency: 2 } } }
);
db.users.updateOne(
  { name: "Maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "Good Wine", frequency: 1 },
          { title: "Hiking", frequency: 2 },
        ],
        $sort: { frequency: -1 },
      },
    },
  }
);

/* Removing Elements From Arrays */
db.users.updateOne(
  { name: "Maria" },
  { $pull: { hobbies: { title: "Hiking" } } }
);
db.users.updateOne({ name: "Chris" }, { $pop: { hobbies: 1 } });

/* $addToSet will add unique value only */
db.users.updateOne(
  { name: "Maria" },
  { $addToSet: { hobbies: { tilte: "Sports", frequency: 2 } } }
);
