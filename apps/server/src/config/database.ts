import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cowork-kerala';

    // Mongoose defaults to maxPoolSize 100. Two containers run against this
    // cluster (production and staging), and the M0 tier allows 500 connections
    // in total - shared with every other database on it. Two services at the
    // default could claim 200 on their own, which is what triggered Atlas's
    // "nearing the maximum connections threshold" alert.
    //
    // This workload is light - sub-second responses, low concurrency - so a
    // small pool is ample. Override with MONGO_MAX_POOL_SIZE if that changes.
    await mongoose.connect(mongoURI, {
      maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE) || 10,
      minPoolSize: 0,
      // Return idle sockets to the pool instead of holding them open forever.
      maxIdleTimeMS: 60_000,
      serverSelectionTimeoutMS: 10_000,
    });

    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
