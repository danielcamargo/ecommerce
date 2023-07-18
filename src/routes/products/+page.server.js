
export async function load(event) {
    const { fetch } = event;
    const response = await fetch('/api/products');
    const products = await response.json();
    return {
        products,
    }
}
