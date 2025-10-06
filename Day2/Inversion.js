class Database {
save(data) {
throw new Error("save() must be implemented");
}
}

class MySQLService extends Database {
save(data) {
console.log("Saving to MySQL:", data);
}
}

class MongoService extends Database {
save(data) {
console.log("Saving to MongoDB:", data);
}
}

class UserService {
constructor(db) {
this.db = db;
}


register(user) {
this.db.save(user);
}
}

const mysqlService = new MySQLService();
const userService1 = new UserService(mysqlService);
userService1.register("Alice"); 


const mongoService = new MongoService();
const userService2 = new UserService(mongoService);
userService2.register("Bob"); 