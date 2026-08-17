import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build_step', {
  apiVersion: '2026-07-29.dahlia',
});
