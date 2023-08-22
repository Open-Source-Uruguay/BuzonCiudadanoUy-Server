db.createUser(
    {
      user: "root",
      pwd: "root",
      roles: [
        {
          role: "readWrite",
          db: "mongodb-buzon"
        }
      ]
    }
  );
  db.createCollection('users');
  db.users.insertOne(
    {
      name: 'Shaikan'
    }
  );