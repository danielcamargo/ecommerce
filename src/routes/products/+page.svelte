<script>
    import { invalidateAll } from '$app/navigation';
    
    export let data;
    
    let selectedProduct = {
        id: null,
        name: null,
        price: null,
        description: null,
        imageUrl: null,
    }
    
    async function handleSubmit(){
        if (selectedProduct.id){
            await update();
        } else{
            await create();
        }
        // reset values and reload page.
        resetForm();
        await invalidateAll();
    }
    
    async function create(){
        // create or update the product
        await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(selectedProduct),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    
    async function update(){
        // create or update the product
        await fetch(`/api/products/${selectedProduct.id}`, {
            method: 'PUT',
            body: JSON.stringify(selectedProduct),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    
    function selectProduct(product){
        selectedProduct = product;
    }
    
    function resetForm(){
        selectedProduct = {
            id: null,
            name: null,
            price: null,
            description: null,
            imageUrl: null,
        }
    }
    
    async function handleDelete(){
        const confirmed = window.confirm('Are you sure?');
        if (!confirmed){
            return;
        }
        
        await fetch(`/api/products/${selectedProduct.id}`, {
            method: 'DELETE'
        });
        // reset form
        resetForm();
        await invalidateAll();
    }
</script>

<main class="p-2">
    <form class="boder py-6 px-2" on:submit|preventDefault={handleSubmit}>
        <div class="flex flex-col">
            <label for="name">Name</label>
            <input id="name" type="text" class="py-1 px-2 border" bind:value={selectedProduct.name} />
        </div>
        <div class="flex flex-col">
            <label for="description">Description</label>
            <textarea id="description" class="py-1 px-2 border" placeholder="optional" bind:value={selectedProduct.description}></textarea>
        </div>
        <div class="flex flex-col">
            <label for="price">Price</label>
            <input id="price" type="text" class="py-1 px-2 border" bind:value={selectedProduct.price} />
        </div>
        <div class="flex flex-col">
            <label for="imageUrl">Image URL</label>
            <input id="imageUrl" type="text" class="py-1 px-2 border" bind:value={selectedProduct.imageUrl} />
        </div>
        <div class="mt-6">
            <button class="px-4 py-2 rounded text-white bg-teal-700 hover:bg-teal-800">
                Save
            </button>
            {#if selectedProduct.id}
            <button type="button" on:click={handleDelete} class="px-4 py-2 rounded border hover:text-white hover:bg-red-500">
                Delete
            </button>
            {/if}
            <button type="button" on:click={resetForm} class="px-4 py-2 rounded border text-slate-800 hover:bg-slate-100">
                Cancel
            </button>
        </div>
    </form>
    
    <table class="mt-6">
        <thead>
            <tr>
                <th class="p-2 border">ID</th>
                <th class="p-2 border">Name</th>
                <th class="p-2 border">Price</th>
                <th class="p-2 border">Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.products as product}
                <tr>
                    <td class="p-2 border">{product.id}</td>
                    <td class="p-2 border">{product.name}</td>
                    <td class="p-2 border">{product.price}</td>
                    <td class="p-2 border text-center">
                        <button type="button" on:click={() => selectProduct(product)} class="text-teal-700">
                            select
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    
</main>
