<script context="module" lang="ts">
    export interface Category {
        id: string | number;
        name: string;
        count: number;
    }

    export interface Product {
        id: string | number;
        name: string;
        category_id: string | number;
        info: {
            photo?: string;
        };
    }

    export let description = "Широкий ассортимент качественных лакокрасочных материалов от компании Mustang Farbe: краски, покрытия, лаки и грунтовки.";
</script>


<script lang="ts">
    export let data: {
        products: Product[];
        categories: Category[];
        activeCategory: string | number;
        categoryCounts: Record<string | number, number>;
    };

    $: ({ products, categories, activeCategory } = data);

    let toggleDropdown = false;

    const selectCategory = (categoryId: string | number) => {
        toggleDropdown = false;
        window.location.href = `/products/${categoryId}`;
    };
</script>

<svelte:head>
    <title>{categories.find(c => c.id == activeCategory)?.name} | каталог Mustang Farbe</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="воднодисперсионные краски, декоративные покрытия, грунтовки, лаки, эмали, Mustang Farbe" />
    <link rel="canonical" href="https://mustang-farbe.kz/products/" />

    <meta property="og:title" content={categories.find(c => c.id == activeCategory)?.name} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://mustang-farbe.kz/logo.ico" />
</svelte:head>

<section class="container mx-auto max-w-[1292px] px-4">
    <div class="mt-[3.5rem]">
        <h1 class="md:text-7xl uppercase text-center font-display text-5xl">
            Продукция
        </h1>
    </div>

    <!-- Десктопные категории -->
    <div class="my-[2.5rem] justify-center flex-wrap gap-3 hidden md:flex">
        {#each categories as category}
            <a
                    href="/products/{category.id}"
                    class="[ cat-nav ] inline-flex cursor-pointer tracking-wide items-center px-3 py-2.5 text-sm font-medium text-center rounded-sm transition"
                    class:bg-blue-800={activeCategory == category.id}
                    class:text-white={activeCategory == category.id}
                    class:bg-gray-400={activeCategory != category.id}
                    class:text-black={activeCategory != category.id}
                    class:hover:bg-blue-800={activeCategory != category.id}
                    class:hover:text-white={activeCategory != category.id}
            >
                <strong>{category.name}</strong>
                <span
                        class="ms-2 text-xs"
                        class:text-white={activeCategory == category.id}
                        class:text-blue-800={activeCategory != category.id}
                >
                    {category.count}
                </span>
            </a>
        {/each}
    </div>

    <!-- Мобильное меню -->
    <div class="mt-[1.5rem] mb-[1rem] md:hidden">
        <button
                class="fixed bottom-0 start-0 end-0 bg-gray-100 border-t border-gray-300 h-16 px-5 flex items-center justify-between w-full"
                type="button"
                on:click={() => toggleDropdown = !toggleDropdown}
        >
            <span class="flex flex-col items-start justify-center">
                <span class="text-sm font-medium tracking-wide text-blue-600">Категория</span>
                <span class="text-md font-medium tracking-wide">
                    {categories.find(c => c.id == activeCategory)?.name || 'Выберите категорию'}
                </span>
            </span>
            <span class="flex items-center justify-center">
                <svg class="w-2.5 h-2.5 ms-3 transform transition-transform" class:rotate-180={toggleDropdown} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </span>
        </button>

        {#if toggleDropdown}
            <div class="z-10 fixed bottom-16 left-0 right-0 bg-white divide-y divide-gray-100 rounded-t-lg shadow-lg max-h-[80vh] overflow-y-auto">
                <ul class="py-2 text-sm text-gray-700">
                    {#each categories as category}
                        <li>
                            <button
                                    class="block w-full text-left px-4 py-3 hover:bg-gray-100 uppercase tracking-wider font-[500]"
                                    class:bg-gray-200={activeCategory == category.id}
                                    on:click={() => selectCategory(category.id)}
                            >
                                {category.name} ({category.count})
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>

    <!-- Заголовок категории -->
    <div class="flex flex-row justify-between items-center pb-[1.5rem]">
        <div>
            <h1 class="text-2xl md:text-3xl tracking-wide">
                {categories.find(c => c.id == activeCategory)?.name}
            </h1>
        </div>
    </div>

    <!-- Список продуктов -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {#each products as product (product.id)}
            <div class="w-full max-w-sm bg-white border border-gray-200">
                <a href="/products/product/{product.id}">
                    <!-- Добавьте изображение продукта -->
                    <img class="p-8 w-full aspect-square" src="{product.info.photo}" alt={product.name} title="{product.name}" />
                </a>
                <div class="px-5 pb-5">
                    <a href="/products/product/{product.id}">
                        <h5 class="text-xl font-normal tracking-wide text-black uppercase">
                            {product.name}
                        </h5>
                    </a>
                </div>
            </div>
        {:else}
            <div class="col-span-full text-center py-8">
                <p class="text-gray-500">Нет товаров в этой категории</p>
            </div>
        {/each}
    </div>
</section>

<style>
    .cat-nav:hover span {
        color: #fff;
    }
</style>