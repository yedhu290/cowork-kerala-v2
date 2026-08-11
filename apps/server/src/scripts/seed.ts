import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../models/User.model';
import { config } from '../config/env';

async function seed() {
  const updatePasswordOnly = process.argv.includes('--update-password');

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@coworkkerala.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'Admin@123456';
  const name = process.env.SEED_ADMIN_NAME || 'Admin User';

  await mongoose.connect(config.mongodb.uri);
  console.log('Connected to MongoDB for seeding');

  try {
    const existing = await User.findOne({ email }).select('+password');

    if (existing) {
      existing.password = password; // pre('save') hook re-hashes
      existing.name = updatePasswordOnly ? existing.name : name;
      await existing.save();
      console.log(
        updatePasswordOnly
          ? `Password updated for admin user: ${email}`
          : `Admin user already existed - password reset: ${email}`
      );
    } else {
      await User.create({ email, password, name, role: 'super_admin' });
      console.log(`Admin user created: ${email}`);
    }
  } finally {
    await mongoose.disconnect();
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
