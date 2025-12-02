// src/scripts/db-config.ts
import mongoose from 'mongoose';

// Hardcode your MongoDB URI for now
const MONGODB_URI = 'mongodb+srv://localeyes:wvmqGOSOOnwvQZgw@cluster0.gxzx6qo.mongodb.net';
const DB_NAME = 'localeyes';

export async function connectDBForSeed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log('MongoDB connected successfully for seeding');
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDBForSeed;