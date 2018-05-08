const mongodb = require('mongodb');

const test = async () => {
    try{

  const db = await mongodb.MongoClient.connect('mongodb://localhost:27017/pixalynx');
  console.log("connected to DB");

  await db.db("pixalynx").collection('myTest').drop();
  await db.db("pixalynx").collection('myTest').insertMany([
    { name: 'Enter the Dragon' },
    { name: 'Ip Man' },
    { name: 'Kickboxer' }
  ]);
  console.log("added to the DB");

  // Don't `await`, instead get a cursor
  const cursor = db.db("pixalynx").collection('myTest').find();
  // Use `next()` and `await` to exhaust the cursor
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    console.log(doc.name);
  }
}
    catch(error){
        console.log("error occurred");        
    }
};

const create = async () => {
    try{
    let mydb = await mongodb.MongoClient.connect('mongodb://localhost:27017/pixalynx');
    console.log("connected");
    await mydb.db("pixalynx").collection("myTest").insertOne({name : 'XD just a test'});
    
    }
    catch(err){
        console.log(err);
    }finally{
        console.log("completed");
    }
    
};

const getAllAccounts = async () => {
    try{
        const mydb = await mongodb.MongoClient.connect('mongodb://localhost:27017/pixalynx');
        let result = await mydb.db("pixalynx").collection("Accounts").find({}).toArray();
        //console.log(result);
        return result;
        console.log(`Returned ${result.length} items`);
        mydb.db.close();
    }
    catch(err){
       // console.log(err);
       let result = err;
       return result;
    }
    finally{
        //mydb.db.close();
    }
};