import { NextResponse } from 'next/server';
import { seedDemoUsers } from '@/scripts/seedDemoUsers';

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Seeder only available in development' },
      { status: 403 }
    );
  }

  try {
    await seedDemoUsers();
    return NextResponse.json({ message: 'Demo users created successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed demo users' },
      { status: 500 }
    );
  }
}