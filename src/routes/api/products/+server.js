import { json } from "@sveltejs/kit";
import { createPool } from "@vercel/postgres";
import { stripe } from '$lib/stripe.service.js';
import { toProduct } from "$lib/product.converter.js";

export async function GET() {
    const db = createPool();
    // const result = await db.query(`SELECT * FROM products ORDER BY id`);
    // const products = result.rows;
    const { rows: products } = await db.query(`SELECT * FROM products ORDER BY id`);
    return json(toProduct(products));
}

export async function POST({ request }) {
    const db = createPool();
    const data = await request.json();
    const stripeProduct = await stripe.products.create({
        name: data.name,
        default_price_data: {
            currency: 'usd',
            // the number of cents (an integer)
            unit_amount: Math.round(data.price * 100),
        },
        images: [
            data.imageUrl,
        ]
    });
    // Create a payment link
    const stripePaymentLink = await stripe.paymentLinks.create({
        line_items: [
            {
                price: stripeProduct.default_price,
                quantity: 1,
            },
        ],
    });

    const { rows } = await db.query(`
        INSERT INTO products (
            stripe_id,
            stripe_payment_url,
            name,
            description,
            price,
            image_url
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [stripeProduct.id, stripePaymentLink.url, data.name, data.description, data.price, data.imageUrl])
    const products = toProduct(rows);
    return json(products[0]);
}
