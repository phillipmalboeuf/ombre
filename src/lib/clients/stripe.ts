import { STRIPE_SK } from '$env/static/private'
import Stripe from 'stripe'

export const stripe = new Stripe(STRIPE_SK, { 
  // betas: ['process_order_beta_1'],
  apiVersion: "2022-08-01;orders_beta=v4"
 })