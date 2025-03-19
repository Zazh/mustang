<script lang="ts">
    import { page } from '$app/stores';
    import { get } from 'svelte/store';

    let product = get(page).data.product;
</script>

<svelte:head>
    <title>{product.name} | {product.category_name} | «Mustang Farbe» </title>
    <meta name="description" content={product.info.description} />
    <meta name="keywords" content="лаки, краски, фасадные краски, акриловые краски, антикоррозийные покрытия, Mustang Farbe, Profi Color" />
    <link rel="canonical" href="https://mustang-farbe.kz/products/{product.id}" />

    <meta property="og:title" content={product.name}  />
    <meta property="og:description" content={product.info.description} />
    <meta property="og:image" content="https://mustang-farbe.kz/logo.ico" />
</svelte:head>

<div class="container mx-auto max-w-[1292px] px-4">
    <div class="mt-[2rem] hidden md:block">
        <nav class="flex flex-nowrap" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li>
                    <div class="flex items-center">
                        <a href="/category" class="leading-none inline-flex items-center text-sm font-medium [ tracking-wider uppercase text-blue-800 ] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Категорий
                        </a>
                    </div>
                </li>
                <li>
                    <div class="flex flex-nowrap items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-300 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
                        </svg>
                        <a href="/products/{product.category_id}" class="leading-none inline-flex items-center text-sm font-medium [ tracking-wider uppercase text-blue-800 ] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            {product.category_name}
                        </a>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-300 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="leading-none ms-1 text-sm font-medium [ tracking-wider uppercase ]  text-gray-600 md:ms-2 dark:text-gray-400">
                            {product.name}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    </div>

    <div class="flex md:hidden -mt-2 fixed">
        <a href="/products/{product.category_id}" class="aspect-square text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2">
            <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="sr-only">Back button</span>
        </a>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 justify-center">
        <div class="w-full">
            <img src="{product.info.photo}" alt="{product.name}" class="w-full lg:w-[90%] aspect-square border-1 border-gray-200">
        </div>

        <div>
            <div class="w-full lg:w-[90%] pt-6 lg:pt-0">
                <h1 class="text-5xl [ tracking-wider uppercase font-[500] ]">{product.name}</h1>
                <div class="flex gap-3 my-5">
                    <span class="text-sm [ tracking-wider uppercase font-bold ]">код товара:</span>
                    <span class="text-sm [ tracking-wider uppercase font-bold text-gray-300 ]">{product.sku}</span>
                </div>

                <div class="pb-2 border-b-1 border-b-gray-500">
                    <div>
                        <p class="pb-3 [ text-sm ]">
                            {product.info.description}
                        </p>
                    </div>

                    <ul class="pt-3 pb-5" role="list">
                        {#each product.info.advantages as advantage}
                        <li class="flex items-center [ pb-2 ]">
                            <svg class="shrink-0 w-6 h-6 text-lime-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span class="font-semibold text-black ms-2 text-sm">{advantage.trim()}</span>
                        </li>
                        {/each}

                    </ul>
                </div>

                <div class="pt-10">
                    <h2 class="text-xl [ tracking-widest uppercase font-bold ]">
                        свойства
                    </h2>
                    <ul class="py-3" role="list">
                        {#each product.attributes as attr}
                            <li class="flex justify-between items-center [ tracking-wider text-sm font-normal ] [ py-2 ]">
                                <span class="font-[500] [ capitalize ]">{attr.attribute_name}:</span>
                                <span class="font-[500] uppercase">{attr.value}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>

</div>