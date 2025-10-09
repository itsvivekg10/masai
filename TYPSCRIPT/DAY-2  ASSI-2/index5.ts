interface Database {
  save(data: string): void;
}

class MySQLService implements Database {
  save(data: string): void {
    console.log("Saving to MySQL:", data);
  }
}

class MongoDBService implements Database {
  save(data: string): void {
    console.log("Saving to MongoDB:", data);
  }
}

class UserService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  register(user: string): void {
    this.db.save(user);
  }
}

const mysqlService = new MySQLService();
const userService1 = new UserService(mysqlService);
userService1.register("Vivek");

const mongoService = new MongoDBService();
const userService2 = new UserService(mongoService);
userService2.register("Aman");
