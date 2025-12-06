// src/models/Booking.ts
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    specialRequests: {
      type: String,
      default: "",
      trim: true,
    },
    stripePaymentIntentId: {
      type: String,
      default: "",
    },
    stripeCustomerId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "pending_payment", // ADD THIS
        "pending",         // You might have this already
        "confirmed",
        "cancelled",
        "completed",
        "failed",
      ],
      default: "pending_payment", // Change default
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      default: "",
    },
    cancellationDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    reviewLeft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
bookingSchema.index({ tourist: 1, createdAt: -1 });
bookingSchema.index({ guide: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ date: 1 });

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);