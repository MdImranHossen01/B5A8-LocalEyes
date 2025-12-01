import dbConnect from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

async function seedDemoUsers() {
  try {
    await dbConnect();

    // Clear existing demo users
    await User.deleteMany({ 
      email: { 
        $in: ['tourist@demo.com', 'guide@demo.com', 'admin@demo.com'] 
      } 
    });

    const demoUsers = [
      {
        name: 'Demo Tourist',
        email: 'tourist@demo.com',
        password: await hashPassword('123456'),
        role: 'tourist',
        bio: 'Passionate traveler exploring the world one city at a time',
        languages: ['english', 'spanish'],
        travelPreferences: ['adventure', 'culture', 'food'],
      },
      {
        name: 'Local Guide Alex',
        email: 'guide@demo.com',
        password: await hashPassword('123456'),
        role: 'guide',
        bio: 'Professional local guide with 5 years of experience showing visitors the hidden gems of our beautiful city',
        languages: ['english', 'french'],
        expertise: ['history', 'food', 'photography'],
        dailyRate: 75,
        isVerified: true,
        rating: 4.8,
        reviewsCount: 42,
      },
      {
        name: 'Platform Admin',
        email: 'admin@demo.com',
        password: await hashPassword('123456'),
        role: 'admin',
        bio: 'Platform administrator ensuring the best experience for guides and travelers',
      },
    ];

    await User.insertMany(demoUsers);
    console.log('Demo users created successfully!');
    
    // Log the demo credentials
    console.log('\nDemo Login Credentials:');
    console.log('Tourist: tourist@demo.com / 123456');
    console.log('Guide: guide@demo.com / 123456');
    console.log('Admin: admin@demo.com / 123456');
    
  } catch (error) {
    console.error('Error seeding demo users:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedDemoUsers();
}

export { seedDemoUsers };