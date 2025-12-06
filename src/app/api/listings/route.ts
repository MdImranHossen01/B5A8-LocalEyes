/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/listings/route.ts - UPDATED SEARCH FUNCTIONALITY
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    
    // Extract query parameters
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const language = searchParams.get('language');
    const date = searchParams.get('date');
    const guideId = searchParams.get('guideId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sort = searchParams.get('sort') || '-createdAt';

    // Build query
    const query: any = { isActive: true };

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { itinerary: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (minPrice) {
      query.tourFee = { ...query.tourFee, $gte: parseInt(minPrice) };
    }

    if (maxPrice) {
      query.tourFee = { ...query.tourFee, $lte: parseInt(maxPrice) };
    }

    if (guideId) {
      query.guide = guideId;
    }

    // Language filter requires joining with User model
    let languageFilter = null;
    if (language) {
      languageFilter = { languages: { $in: [new RegExp(language, 'i')] } };
    }

    // Date filter (you might need to adjust based on your booking system)
    if (date) {
      // This is a placeholder - implement based on your availability system
      query.date = date;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // If language filter exists, we need to do a more complex query
    if (languageFilter) {
      // Find guides who speak the language
      const guides = await User.find({
        ...languageFilter,
        role: 'guide',
        isActive: true,
      }).select('_id');

      const guideIds = guides.map(guide => guide._id);
      if (guideIds.length > 0) {
        query.guide = { $in: guideIds };
      } else {
        // If no guides speak the language, return empty results
        return NextResponse.json({
          tours: [],
          total: 0,
          page,
          limit,
          totalPages: 0,
        });
      }
    }

    // Get total count for pagination
    const total = await Tour.countDocuments(query);

    // Execute query with population
    const tours = await Tour.find(query)
      .populate({
        path: 'guide',
        select: 'name profilePic rating languages email',
        match: { isActive: true }
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Filter out tours with inactive guides
    const validTours = tours.filter(tour => tour.guide !== null);

    return NextResponse.json({
      tours: validTours,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}