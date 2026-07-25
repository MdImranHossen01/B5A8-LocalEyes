const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://localeyes:wvmqGOSOOnwvQZgw@cluster0.gxzx6qo.mongodb.net";
const DB_NAME = process.env.DB_NAME || "localeyes";

console.log("Using Database Name:", DB_NAME);

const newTours = [
  // --- Domestic Packages (5) ---
  {
    title: "Sundarbans Wildlife Safari & Mangrove Adventure",
    description: "Embark on an unforgettable deep forest cruise through the Sundarbans, the world's largest mangrove forest. Explore wildlife, spot royal bengal tigers, and cruise the rivers.",
    itinerary: "Day 1: Board luxury launch from Khulna. Cruising down to Katka Forest Office.\nDay 2: Morning canal cruise, Katka beach walk, wildlife watchtower tracking.\nDay 3: Visit Harbaria Eco Tourism Center, crocodile breeding farm, and return to Khulna.",
    tourFee: 150,
    duration: 72, // 3 days
    meetingPoint: "Khulna Ship Terminal",
    maxGroupSize: 20,
    images: ["/assets/package/sundarbans.webp"],
    category: "Wildlife & Nature",
    city: "Sundarbans",
    isActive: true,
    rating: 4.9,
    reviewsCount: 15
  },
  {
    title: "Cox's Bazar Relaxing Beach Getaway",
    description: "Relax on the sandy shores of the world's longest natural sea beach. Enjoy marine drive cruises, water sports, and local seafood dinners.",
    itinerary: "Day 1: Hotel check-in, sunset at Sugandha Beach, beachside dinner.\nDay 2: Morning drive to Inani Beach via Himchari waterfall, evening shopping at Burmese market.\nDay 3: Speedboat ride at Laboni beach, check-out.",
    tourFee: 90,
    duration: 48, // 2 days
    meetingPoint: "Cox's Bazar Airport / Hotel Lobby",
    maxGroupSize: 15,
    images: ["/assets/package/coxs-bazar.webp"],
    category: "Beach",
    city: "Cox's Bazar",
    isActive: true,
    rating: 4.8,
    reviewsCount: 32
  },
  {
    title: "Sajek Valley Scenic Cloud Retreat",
    description: "Experience Sajek Valley, the land of clouds. Watch sunrise over cloud oceans from high peaks and visit traditional indigenous villages.",
    itinerary: "Day 1: Jeep ride from Khagrachari to Sajek, sunset view from Ruiluipara.\nDay 2: Early sunrise at Konglak Para peak, visit stone garden, evening tribal music.\nDay 3: Return to Khagrachari, explore Alutila mysterious cave.",
    tourFee: 110,
    duration: 72,
    meetingPoint: "Khagrachari Bus Stand",
    maxGroupSize: 10,
    images: ["/assets/package/sajek-valley.webp"],
    category: "Adventure",
    city: "Sajek Valley",
    isActive: true,
    rating: 4.9,
    reviewsCount: 22
  },
  {
    title: "Sylhet Tea Gardens & Cascading Waterfalls",
    description: "Explore the breathtaking landscapes of Sylhet. Visit the swamp forest of Ratargul, crystal clear waters of Lalakhal, and lush tea gardens.",
    itinerary: "Day 1: Ratargul Swamp Forest boat tour, sunset cruise at Lalakhal.\nDay 2: Visit Jaflong zero point, tea gardens, and Sengram Punji waterfall.\nDay 3: Explore Hazrat Shah Jalal Shrine, souvenir shopping.",
    tourFee: 85,
    duration: 48,
    meetingPoint: "Sylhet City Hotel",
    maxGroupSize: 12,
    images: ["/assets/package/sylhet.webp"],
    category: "Nature & Wildlife",
    city: "Sylhet",
    isActive: true,
    rating: 4.7,
    reviewsCount: 18
  },
  {
    title: "Sreemangal Nature Trail & Rain Forest Experience",
    description: "Walk inside the dense Lawachara rainforest, spot rare monkeys and birds, and taste the famous 7-layer tea.",
    itinerary: "Day 1: Hike in Lawachara Rain Forest, evening 7-layer tea tasting.\nDay 2: Cycle tour through Baikka Beel wetland bird sanctuary and pineapple gardens.\nDay 3: Visit Madhabpur lake, local tribal handloom shopping.",
    tourFee: 80,
    duration: 48,
    meetingPoint: "Sreemangal Railway Station",
    maxGroupSize: 8,
    images: ["/assets/package/sreemangal.webp"],
    category: "Nature & Wildlife",
    city: "Sreemangal",
    isActive: true,
    rating: 4.9,
    reviewsCount: 14
  },
  
  // --- International Packages (7) ---
  {
    title: "Premium Hajj & Umrah Guided Package - Saudi Arabia",
    description: "A fully guided spiritual journey to Makkah and Madinah with premium hotel stays close to Haram, transport, and expert guides.",
    itinerary: "Day 1-5: Arrival in Madinah, Ziyarah, prayer at Masjid an-Nabawi.\nDay 6-10: Travel to Makkah, perform Umrah under guide guidance, Ziyarah.\nDay 11-14: Return flights from Jeddah.",
    tourFee: 1450,
    duration: 336, // 14 days
    meetingPoint: "Dhaka Hazrat Shahjalal International Airport",
    maxGroupSize: 40,
    images: ["/assets/package/umrah-saudi.webp"],
    category: "Hajj & Umrah",
    city: "Saudi Arabia",
    isActive: true,
    rating: 5.0,
    reviewsCount: 88
  },
  {
    title: "Dubai Skyline Tour & Desert Safari",
    description: "Discover the architectural wonders of Dubai. Visit Burj Khalifa, Dubai Mall, and experience thrilling desert dune bashing with BBQ dinner.",
    itinerary: "Day 1: Arrival, luxury marina yacht cruise at night.\nDay 2: Half-day Dubai City Tour, afternoon Desert Safari, camel ride, BBQ show.\nDay 3-4: Burj Khalifa observation deck, shopping, flight home.",
    tourFee: 650,
    duration: 96, // 4 days
    meetingPoint: "Dubai International Airport Terminal 3",
    maxGroupSize: 15,
    images: ["/assets/package/dubai-safari.webp"],
    category: "Holiday Packages",
    city: "Dubai",
    isActive: true,
    rating: 4.9,
    reviewsCount: 45
  },
  {
    title: "Malaysia Kuala Lumpur & Langkawi Explorer",
    description: "Combine the vibrant city life of Kuala Lumpur Petronas towers with the serene white beaches of Langkawi island.",
    itinerary: "Day 1-2: Kuala Lumpur City tour, Batu Caves, Genting Highlands day trip.\nDay 3-4: Fly to Langkawi, island hopping, beach activities, duty-free shopping.\nDay 5: Return flight.",
    tourFee: 490,
    duration: 120, // 5 days
    meetingPoint: "KLIA Airport Arrivals",
    maxGroupSize: 12,
    images: ["/assets/package/malaysia-explorer.webp"],
    category: "Holiday Packages",
    city: "Malaysia",
    isActive: true,
    rating: 4.8,
    reviewsCount: 29
  },
  {
    title: "Classic Italy Heritage & Rome Walk",
    description: "Complete Schengen visa support and a guided tour of historic Rome, Colosseum, Vatican museums, and Florence art tour.",
    itinerary: "Day 1-2: Guided tour of the Colosseum, Roman Forum, and Vatican City.\nDay 3-4: Fast train to Florence, Michelangelo David museum tour, wine tasting.\nDay 5: Departure.",
    tourFee: 950,
    duration: 120,
    meetingPoint: "Rome Fiumicino Airport",
    maxGroupSize: 10,
    images: ["/assets/package/italy-rome.webp"],
    category: "Visa Services",
    city: "Italy",
    isActive: true,
    rating: 4.9,
    reviewsCount: 12
  },
  {
    title: "Scenic Muscat Harbor & Desert Oasis - Oman",
    description: "Explore the architectural grandeur of Sultan Qaboos Grand Mosque, traditional Souq, and natural desert wadis in Muscat.",
    itinerary: "Day 1: Muscat Grand Mosque, Muttrah Souq night walk.\nDay 2: Day trip to Wadi Shab pool swim and Bimmah sinkhole.\nDay 3: Departure.",
    tourFee: 320,
    duration: 72,
    meetingPoint: "Muscat International Airport",
    maxGroupSize: 8,
    images: ["/assets/package/oman-muscat.webp"],
    category: "Visa Services",
    city: "Oman",
    isActive: true,
    rating: 4.8,
    reviewsCount: 16
  },
  {
    title: "Modern Doha Stopover & Pearl Harbor - Qatar",
    description: "A fast-track transit package including city skylines, Souq Waqif, museum of Islamic art, and desert dunes in Doha.",
    itinerary: "Day 1: West Bay skyline photography, Souq Waqif dinner.\nDay 2: Desert safari tour where the inland sea meets dunes, airport drop.",
    tourFee: 240,
    duration: 48,
    meetingPoint: "Doha Hamad International Airport Terminal 1",
    maxGroupSize: 15,
    images: ["/assets/package/qatar-doha.webp"],
    category: "Flight Bookings",
    city: "Qatar",
    isActive: true,
    rating: 4.7,
    reviewsCount: 9
  },
  {
    title: "Brunei Royal Mosque Heritage & Water Village",
    description: "Explore the golden domes of Brunei's royal mosques, Kampong Ayer water village boat ride, and pristine rain forests.",
    itinerary: "Day 1: Omar Ali Saifuddien Mosque, water taxi tour, Proboscis monkey watching.\nDay 2: Temburong National Park canopy walk, return flight.",
    tourFee: 380,
    duration: 48,
    meetingPoint: "Brunei International Airport",
    maxGroupSize: 8,
    images: ["/assets/package/brunei-royal.webp"],
    category: "Holiday Packages",
    city: "Brunei",
    isActive: true,
    rating: 4.8,
    reviewsCount: 11
  }
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  console.log("Connected successfully!");

  // Find a user to act as guide reference
  const usersCollection = mongoose.connection.db.collection('users');
  let user = await usersCollection.findOne({ role: 'admin' });
  if (!user) {
    user = await usersCollection.findOne({ role: 'guide' });
  }
  if (!user) {
    user = await usersCollection.findOne({});
  }

  if (!user) {
    console.error("No user found in the database. Please register a user first!");
    process.exit(1);
  }

  console.log(`Using user ID: ${user._id} (${user.name}) as default guide/owner.`);

  const toursCollection = mongoose.connection.db.collection('tours');
  
  console.log("Clearing old tours...");
  const deleteResult = await toursCollection.deleteMany({});
  console.log(`Deleted ${deleteResult.deletedCount} old tours.`);

  // Sample dates and times
  const sampleDates = ["2026-08-05", "2026-08-10", "2026-08-12", "2026-08-15", "2026-08-20", "2026-08-25"];
  const sampleTimes = ["08:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "02:00 PM"];

  // Prepare tours
  const preparedTours = newTours.map((t, index) => ({
    ...t,
    tourDate: t.tourDate || sampleDates[index % sampleDates.length],
    tourTime: t.tourTime || sampleTimes[index % sampleTimes.length],
    guide: user._id,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  console.log("Inserting 12 new premium packages...");
  const insertResult = await toursCollection.insertMany(preparedTours);
  console.log(`Successfully seeded ${insertResult.insertedCount} new tour packages!`);

  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
