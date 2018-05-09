const MongoClient = require("mongodb").MongoClient;

const MongoConn = "mongodb://localhost:27017/pixalynx";
// the name of our accounts collection
const Accounts = "Accounts";

class MongoDatabase {
  constructor(database) {
    this.database = database;
  }

  //returns the Database name we set when creating the class
  getDatabase() {
    return this.database;
  }

  // returns all the accounts
  async getAllAccounts() {
    try {
      let db = await MongoClient.connect(MongoConn);
      //if we can connect then output to the console that we did
      //console.log("Connected to mongoDB");
      let result = await db
        .db(this.database)
        .collection(Accounts)
        .find({})
        .toArray();
      //console.log(`Returned ${result.length} items`);
      return result;
      db.close();
    } catch (err) {
      let result = err;
      return err;
      db.close();
    }
  }

  // returns account by accountName
  async getAccountByName(accountName) {
    this.accountName = accountName;
    try {
      let query = { username: this.accountName };
      let db = await MongoClient.connect(MongoConn);
      let result = await db
        .db(this.database)
        .collection(Accounts)
        .find(query)
        .toArray();
      if (result.length) {
        return result;
        db.close();
      } else {
        return "failed";
        db.close();
      }
    } catch (err) {
      console.log("an error occurred during getAccountByName " + err);
    }
  }

  async createAccount(accObj) {
    this.accObj = accObj;
    try {
      let db = await MongoClient.connect(MongoConn);
      let insert = await db
        .db(this.database)
        .collection(Accounts)
        .insertOne(this.accObj);
      return true;
      db.close();
    } catch (err) {
      return false;
      db.close();
    }
  }

  async login(loginObj) {
      this.loginObj = loginObj;
      try{
        let db = await MongoClient.connect(MongoConn);
        let query = { username : this.loginObj.username };
        let acclogin = await db.db(this.database).collection(Accounts).findOne(query);
        if(this.loginObj.password === acclogin.password){
            return true;
            db.close();
        }else{
            return false;
            db.close();
        }
      }catch(err){
          return false;
          db.close();
      }
  }
}

module.exports = MongoDatabase;
