import { STRIPE_SK } from '$env/static/private'
import Stripe from 'stripe'

export const stripe = new Stripe(STRIPE_SK, { apiVersion: '2022-08-01' })