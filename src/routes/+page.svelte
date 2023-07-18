<script>
    export let data;
</script>

<main>
    <!-- we will do it later -->
    <h1>This is our store front</h1>
    <ul>
    {#each data.products as product }
        <li>
            <img src="{product.imageUrl}" alt="Product Picture" />
            <a href="{product.paymentUrl}">{product.name} - {product.price}</a>
        </li>
    {/each}
    </ul>
</main>
