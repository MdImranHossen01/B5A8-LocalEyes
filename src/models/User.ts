import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["tourist", "guide", "admin"],
      default: "tourist",
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    languages: [
      {
        type: String,
      },
    ],
    // Guide specific fields
    expertise: [
      {
        type: String,
      },
    ],
    dailyRate: {
      type: Number,
      default: 0,
    },
    // Tourist specific fields
    travelPreferences: [
      {
        type: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    verificationNotes: {
      type: String,
      default: "",
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    bannedUntil: {
      type: Date,
      default: null,
    },

    adminNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
