import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: 'Rest_API',
    };
    mongoose.set('strictQuery', true);
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log('Db Connected Successfully ...');
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
