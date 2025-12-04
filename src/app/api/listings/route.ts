/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const language = searchParams.get('language');
    const guideId = searchParams.get('guideId');

    const query: any = { isActive: true };

    // City search (case-insensitive partial match)
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.tourFee = {};
      if (minPrice) query.tourFee.$gte = parseInt(minPrice);
      if (maxPrice) query.tourFee.$lte = parseInt(maxPrice);
    }

    // Language filter (through guide's languages)
    if (language) {
      query['guide.languages'] = { $in: [new RegExp(language, 'i')] };
    }

        if (guideId) {
      query.guide = guideId;
    }

    // Note: Date filtering would require availability system
    // For now, we'll just return all tours

    const tours = await Tour.find(query)
      .populate('guide', 'name profilePic rating reviewsCount languages expertise')
      .sort({ createdAt: -1 });

    return NextResponse.json({ tours });
  } catch (error) {
    console.error('Get listings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}