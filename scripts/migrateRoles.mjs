import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const userSchema = new mongoose.Schema({
  role: { type: String }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function migrateRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME || 'localeyes' });
    const result = await User.updateMany(
      { role: { $in: ['guide', 'tourist', 'host', 'Guide', 'Tourist'] } },
      { $set: { role: 'user' } }
    );
    console.log('Role Migration Completed Successfully:', result);
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

migrateRoles();
