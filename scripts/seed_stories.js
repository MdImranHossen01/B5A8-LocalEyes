const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://localeyes:wvmqGOSOOnwvQZgw@cluster0.gxzx6qo.mongodb.net";
const DB_NAME = process.env.DB_NAME || "localeyes";

const sampleStories = [
  {
    title: "Encountering the Royal Bengal Tiger in Sundarbans",
    content: "Cruising down the narrow river canals of the Sundarbans at dawn was a magical experience. As the morning mist lifted, our boat guide spotted fresh paw prints on the muddy bank. Minutes later, we saw a majestic Bengal Tiger near the water edge! It was a once-in-a-lifetime wildlife experience.",
    location: "Sundarbans, Khulna",
    images: ["/assets/package/sundarbans.webp"],
    likes: 42,
    authorName: "Anisur Rahman",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "Sunset Cruise along Cox's Bazar Marine Drive",
    content: "Driving down the endless ocean coastline of Marine Drive with open sea on one side and green hills on the other felt surreal. Stopping by Inani beach for fresh coconut juice while watching the sun dip into the Bay of Bengal was pure perfection.",
    location: "Cox's Bazar, Bangladesh",
    images: ["/assets/package/coxs-bazar.webp"],
    likes: 58,
    authorName: "Sabrina Islam",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "Floating Above Clouds in Sajek Valley",
    content: "Waking up at 5:00 AM at Konglak Para peak and looking down at a sea of white clouds wrapping around the lush green mountains was breathtaking. Sajek Valley is truly the valley of clouds in Bangladesh.",
    location: "Sajek Valley, Rangamati",
    images: ["/assets/package/sajek-valley.webp"],
    likes: 67,
    authorName: "Tanvir Ahmed",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "Swamp Forest Adventure in Ratargul, Sylhet",
    content: "Navigating through the silent submerged trees of Ratargul Swamp Forest in a small wooden dinghy felt like stepping into an Amazonian jungle. The tranquility and reflection of trees in the clear green water was stunning.",
    location: "Sylhet, Bangladesh",
    images: ["/assets/package/sylhet.webp"],
    likes: 39,
    authorName: "Nusrat Jahan",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "Morning Walks & 7-Layer Tea in Sreemangal",
    content: "Hiking inside Lawachara National Forest surrounded by towering trees and chattering monkeys followed by tasting the famous 7-layer tea at Neelkanth Tea Cabin made Sreemangal an unforgettable weekend trip.",
    location: "Sreemangal, Moulvibazar",
    images: ["/assets/package/sreemangal.webp"],
    likes: 51,
    authorName: "Mahmud Hasan",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "A Peaceful Spiritual Journey to Makkah & Madinah",
    content: "Performing Umrah with my family was a deeply moving experience. The serene atmosphere of Masjid an-Nabawi in Madinah and seeing the Holy Kaaba for the first time filled our hearts with immense gratitude.",
    location: "Makkah & Madinah, Saudi Arabia",
    images: ["/assets/package/umrah-saudi.webp"],
    likes: 124,
    authorName: "Haji Mohammad Ali",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "Desert Dune Bashing & Arabian Sunset in Dubai",
    content: "Riding 4x4 Land Cruisers over golden sand dunes followed by camel riding and watching traditional Tanoura dance performances under the starlit desert sky made Dubai unforgettable.",
    location: "Dubai, United Arab Emirates",
    images: ["/assets/package/dubai-safari.webp"],
    likes: 88,
    authorName: "Fariha Chowdhury",
    authorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "From Petronas Towers to Langkawi Island Beaches",
    content: "Malaysia offers the best of both worlds! After exploring the bustling city and iconic Petronas Twin Towers in KL, relaxing on the white sand beaches of Langkawi island was pure paradise.",
    location: "Kuala Lumpur & Langkawi, Malaysia",
    images: ["/assets/package/malaysia-explorer.webp"],
    likes: 73,
    authorName: "Imtiaz Hossain",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "Walking Through History in Ancient Rome",
    content: "Standing inside the ancient Colosseum and walking down the cobblestone streets of Rome felt like traveling back in time. The gelato, Roman architecture, and art museums were world class.",
    location: "Rome, Italy",
    images: ["/assets/package/italy-rome.webp"],
    likes: 95,
    authorName: "Riya Sharma",
    authorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200"
  },
  {
    title: "Exploring Muscat Grand Mosque & Desert Wadis",
    content: "Oman is a hidden gem of Arabia! The architecture of Sultan Qaboos Grand Mosque in Muscat with its giant Persian carpet and crystal chandeliers left us speechless.",
    location: "Muscat, Oman",
    images: ["/assets/package/oman-muscat.webp"],
    likes: 47,
    authorName: "Zubair Khan",
    authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  }
];

async function seedStories() {
  console.log("Connecting to MongoDB for Stories Seed...");
  await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
  console.log("Connected successfully!");

  const usersCollection = mongoose.connection.db.collection('users');
  let user = await usersCollection.findOne({});
  if (!user) {
    console.error("No user found in DB!");
    process.exit(1);
  }

  const storiesCollection = mongoose.connection.db.collection('stories');
  
  console.log("Clearing old stories...");
  await storiesCollection.deleteMany({});

  const preparedStories = sampleStories.map(story => ({
    ...story,
    author: user._id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  console.log("Inserting 10 travel stories...");
  const res = await storiesCollection.insertMany(preparedStories);
  console.log(`Successfully seeded ${res.insertedCount} stories!`);

  process.exit(0);
}

seedStories().catch(err => {
  console.error("Seeding stories failed:", err);
  process.exit(1);
});
