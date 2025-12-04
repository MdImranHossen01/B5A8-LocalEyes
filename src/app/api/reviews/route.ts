import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Review from '@/models/Review';
import User from '@/models/User';
import Tour from '@/models/Tour';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const reviewData = await request.json();
    const review = await Review.create(reviewData);
    const reviewDoc = Array.isArray(review) ? review[0] : review;

    // Update guide rating
    const guideReviews = await Review.find({ guide: reviewData.guide });
    const avgRating = guideReviews.reduce((acc, rev) => acc + rev.rating, 0) / guideReviews.length;
    
    await User.findByIdAndUpdate(reviewData.guide, {
      rating: avgRating,
      reviewsCount: guideReviews.length,
    });

    // Update tour rating
    const tourReviews = await Review.find({ tour: reviewData.tour });
    const tourAvgRating = tourReviews.reduce((acc, rev) => acc + rev.rating, 0) / tourReviews.length;
    
    await Tour.findByIdAndUpdate(reviewData.tour, {
      rating: tourAvgRating,
      reviewsCount: tourReviews.length,
    });
    await reviewDoc.populate('tourist', 'name profilePic')
      .populate('guide', 'name profilePic')
      .populate('tour', 'title');

    return NextResponse.json({ review: reviewDoc }, { status: 201 });
    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const guideId = searchParams.get('guideId');
    const tourId = searchParams.get('tourId');
    const touristId = searchParams.get('touristId');

    let query = {};
    if (guideId) query = { guide: guideId };
    if (tourId) query = { tour: tourId };
    if (touristId) query = { tourist: touristId };

    const reviews = await Review.find(query)
      .populate('tourist', 'name profilePic')
      .populate('guide', 'name profilePic')
      .populate('tour', 'title')
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}