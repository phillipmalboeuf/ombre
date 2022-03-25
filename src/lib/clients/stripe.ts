import Stripe from 'stripe';

export const stripe = new Stripe(import.meta.env.VITE_STRIPE_SK as string, { apiVersion: '2020-08-27' })