import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';
import User from '@/models/User';

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Seeder only available in development' },
      { status: 403 }
    );
  }

  try {
    await dbConnect();

    // Clear existing demo tours
    await Tour.deleteMany({ title: { $regex: 'Demo Tour', $options: 'i' } });

    // Find guide users
    const guides = await User.find({ role: 'guide' }).limit(3);

    if (guides.length === 0) {
      return NextResponse.json(
        { error: 'No guide users found. Please seed demo users first.' },
        { status: 400 }
      );
    }

    const demoData = [
      {
        title: 'Demo Tour: Hidden Food Gems of Barcelona',
        description: 'Discover the most authentic tapas bars and local food markets that tourists never find. Taste traditional Catalan cuisine and learn about the history behind each dish.',
        itinerary: 'Start at La Boqueria Market, visit 3 hidden tapas bars, explore the Gothic Quarter, end with traditional Catalan dessert.',
        tourFee: 65,
        duration: 4,
        meetingPoint: 'Plaça de Catalunya, Barcelona',
        maxGroupSize: 8,
        images: ['/api/placeholder/600/400?text=Barcelona+Food'],
        category: 'food',
        city: 'Barcelona',
        guide: guides[0]._id,
      },
      {
        title: 'Demo Tour: Tokyo Nightlife Adventure',
        description: 'Experience Tokyo after dark like a true local. Visit hidden izakayas, secret cocktail bars, and experience the vibrant nightlife of Shinjuku and Shibuya.',
        itinerary: 'Meet at Shinjuku Station, explore Golden Gai alleyways, visit local izakaya, experience Shibuya nightlife, end at rooftop bar with city views.',
        tourFee: 85,
        duration: 5,
        meetingPoint: 'Shinjuku Station East Exit, Tokyo',
        maxGroupSize: 6,
        images: ['/api/placeholder/600/400?text=Tokyo+Nightlife'],
        category: 'nightlife',
        city: 'Tokyo',
        guide: guides[1]._id,
      },
      {
        title: 'Demo Tour: Paris Art & History Walk',
        description: 'Journey through the artistic heart of Paris. Visit hidden art galleries, learn about famous artists, and discover the stories behind Parisian landmarks.',
        itinerary: 'Start at Musée d\'Orsay, walk through Saint-Germain-des-Prés, visit hidden art galleries, explore Latin Quarter, end at Shakespeare & Company bookstore.',
        tourFee: 75,
        duration: 3.5,
        meetingPoint: 'Musée d\'Orsay Entrance, Paris',
        maxGroupSize: 10,
        images: ['/api/placeholder/600/400?text=Paris+Art'],
        category: 'art',
        city: 'Paris',
        guide: guides[2]._id,
      },
      {
        title: 'Demo Tour: New York Street Photography',
        description: 'Capture the essence of New York City through your lens. Learn photography techniques while exploring the most photogenic neighborhoods with a local photographer.',
        itinerary: 'Start in DUMBO for bridge shots, walk through Brooklyn Bridge Park, explore SoHo streets, capture Times Square energy, end in Central Park.',
        tourFee: 95,
        duration: 4,
        meetingPoint: 'Washington Street, DUMBO, Brooklyn',
        maxGroupSize: 6,
        images: ['/api/placeholder/600/400?text=NYC+Photography'],
        category: 'photography',
        city: 'New York',
        guide: guides[0]._id,
      },
      {
        title: 'Demo Tour: Bali Cultural Immersion',
        description: 'Experience authentic Balinese culture beyond the tourist spots. Visit local villages, participate in traditional ceremonies, and learn about Balinese Hinduism.',
        itinerary: 'Early morning temple visit, traditional offering making, local village lunch, rice field walk, traditional dance performance.',
        tourFee: 55,
        duration: 6,
        meetingPoint: 'Ubud Central Market, Bali',
        maxGroupSize: 8,
        images: ['/api/placeholder/600/400?text=Bali+Culture'],
        category: 'culture',
        city: 'Bali',
        guide: guides[1]._id,
      },
      {
        title: 'Demo Tour: London Royal History',
        description: 'Walk in the footsteps of kings and queens. Discover the hidden history of London\'s royal palaces, learn about royal scandals, and see ceremonial traditions.',
        itinerary: 'Start at Buckingham Palace, walk through St. James Park, visit Churchill War Rooms, explore Westminster area, end at Tower of London.',
        tourFee: 70,
        duration: 4.5,
        meetingPoint: 'Buckingham Palace Gates, London',
        maxGroupSize: 12,
        images: ['/api/placeholder/600/400?text=London+History'],
        category: 'history',
        city: 'London',
        guide: guides[2]._id,
      },
    ];

    await Tour.insertMany(demoData);
    
    const createdTours = await Tour.find({ title: { $regex: 'Demo Tour', $options: 'i' } })
      .populate('guide', 'name profilePic rating reviewsCount languages expertise');

    return NextResponse.json({ 
      message: 'Demo tours created successfully',
      tours: createdTours 
    });
  } catch (error) {
    console.error('Tour seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed demo tours' },
      { status: 500 }
    );
  }
}