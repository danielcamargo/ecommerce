import { toProduct } from '$lib/product.converter.js';
import { error, json } from '@sveltejs/kit';
import { createPool } from '@vercel/postgres';

// Every endpoint in this file depends on an
// existing product
async function findProductById(db, productId) {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
    const rows = toProduct(result.rows);
    if (rows.length === 0) {
        return null;
    }

    return rows[0];
}


// Get one product
export async function GET({ params }) {
    const { id } = params;
    const db = createPool();
    const product = await findProductById(db, id);
    if (product === null) {
        throw error(404, 'Product not found');
    }
    // As a json payload
    return json(product);
}


// Create a new product
export async function PUT({ params, request }) {
    const { id } = params;
    const db = createPool();
    const product = await findProductById(db, id);
    if (product === null) {
        throw error(404, 'Product not found');
    }

    const data = await request.json();
    await db.query(`
        UPDATE products SET
            name = $1,
            description = $2,
            price = $3,
            image_url = $4
        WHERE id = $5
    `, [data.name, data.description, data.price, data.imageUrl, id]);
    // Get the updated product
    const recentlyUpdatedProduct = await findProductById(db, id);

    // resource was created
    return json(recentlyUpdatedProduct);
}

export async function DELETE({ params }) {
    const { id } = params;
    const db = createPool();
    const product = await findProductById(db, id);
    if (product === null) {
        throw error(404, 'Product not found');
    }

    await db.query('DELETE FROM products WHERE id = $1', [id]);
    // empty body
    return new Response(null, { status: 204 });
}
