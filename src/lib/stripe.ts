import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
});

// Stripe webhook secret for production
export const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Currency configuration
export const CURRENCY = 'usd';
export const MIN_AMOUNT = 500; // $5.00
export const MAX_AMOUNT = 1000000; // $10,000.00

// Helper function to format amount for Stripe
export function formatAmountForStripe(amount: number): number {
  // Stripe expects amounts in cents
  return Math.round(amount * 100);
}

// Helper function to format amount from Stripe
export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}