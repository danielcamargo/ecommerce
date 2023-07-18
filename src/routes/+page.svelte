<script>
  import ProductCard from '$lib/components/ProductCard.svelte';

    export let data;
</script>

<main class="p-6">
    <!-- we will do it later -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.products as product }
        <ProductCard product={product} />
        {/each}
    </div>
</main>
