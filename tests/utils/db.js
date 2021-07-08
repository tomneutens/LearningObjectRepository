import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const mongod = await MongoMemoryServer.create();

// connect to db
let connect = async () => {
    const uri = mongod.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        pooSize: 10
    };
    await mongoose.connect(uri, mongooseOpts);
}

// disconnect and close
let closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

// clear the database, remove all data
let clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export { connect, closeDatabase, clearDatabase }