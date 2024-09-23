import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to database")
    } catch (err) {
        console.log("error connecting to mongo db: ".err.message);
    }
}

export default connectToMongoDB;