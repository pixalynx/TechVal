const MongoClient = require("mongodb").MongoClient;

const MongoConn = "mongodb://localhost:27017/pixalynx";
// the name of our products collection
const Products = "Products";

class MongoDatabase {
  constructor(database) {
    this.database = database;
  }

  //returns the Database name we set when creating the class
  getDatabase() {
    return this.database;
  }

  async getAllProducts() {
    try {
      let db = await MongoClient.connect(MongoConn);
      let result = await db
        .db(this.database)
        .collection(Products)
        .find({})
        .toArray();
      return result;
      db.close();
    } catch (err) {
      let result = false;
      return result;
    }
  }

  async getProductbySerial(serialNumber) {
    this.serialNumber = serialNumber;
    try {
      let query = { serialNumber: this.serialNumber };
      let db = await MongoClient.connect(MongoConn);
      let result = await db
        .db(this.database)
        .collection(Products)
        .find(query)
        .toArray();
      if (result.length) {
        return result;
        db.close();
      } else {
        return "failed";
      }
    } catch (err) {
      return "error";
    }
  }

  async createProduct(productObject) {
    this.productObject = productObject;
    try {
      let db = await MongoClient.connect(MongoConn);
      let insert = await db
        .db(this.database)
        .collection(Products)
        .insertOne(this.productObject);
      return true;
      db.close();
    } catch (err) {
      return false;
    }
  }

  async findProductByType(productType) {
    this.productType = productType;
    try {
      let db = await MongoClient.connect(MongoConn);
      let query = { Type: this.productType };
      let result = await db
        .db(this.database)
        .collection(Products)
        .find(query)
        .toArray();
      if (result.length) {
        return result;
      } else {
          return false;
        db.close();
      }
    } catch (error) {
      return false;
      db.close();
    }
  }
}

module.exports = MongoDatabase;
