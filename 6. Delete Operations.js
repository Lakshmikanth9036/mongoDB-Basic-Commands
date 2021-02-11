db.users.deleteOne({ name: "Chris" });
db.users.deleteMany({ totalAge: { $exists: false }, isSporty: true });
db.users.deleteMany({});
db.users.drop();
db.dropDatabase();