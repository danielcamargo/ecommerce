<script>
    /**
   * @type {{ name: string; price: number; imageUrl: string; description: string; paymentUrl: string; }}
   */
     export let product;
</script>

<div class="border rounded px-8 py-10 space-y-6">
    <h3 class="font-bold text-xl">{product.name}</h3>
    <p class="text-gray-600 text-sm">{product.description}</p>
    <h4 class="font-bold text-4xl">${product.price}</h4>
    <div>
        <img src={product.imageUrl} class="w-full" />
    </div>
    <div>
        <a href={product.paymentUrl} class="w-full font-semibold tracking-wider text-lg block text-center px-10 py-5 bg-orange-600 hover:bg-orange-500 text-orange-100">Buy Now</a>
    </div>
</div>
