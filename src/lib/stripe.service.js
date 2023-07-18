import { STRIPE_SECRET_KEY } from '$env/static/private'
import Stripe from 'stripe';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
});
