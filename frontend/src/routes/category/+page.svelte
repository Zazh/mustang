<script lang="ts">
    export let data;
    export let title = "Категории товаров компании «Mustang Farbe»";
    export let description = "Широкий ассортимент качественных лакокрасочных материалов от компании Mustang Farbe: краски, покрытия, лаки и грунтовки.";
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="воднодисперсионные краски, декоративные покрытия, грунтовки, лаки, эмали, Mustang Farbe" />
    <link rel="canonical" href="https://mustang-farbe.kz/category" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://mustang-farbe.kz/logo.ico" />
</svelte:head>

<div class="container mx-auto max-w-[1292px] px-4">
    <div class="mt-[3.5rem]">
        <h1 class="md:text-7xl [ uppercase text-center font-display ] [ text-5xl ]">
            Каталог
        </h1>
    </div>

    <div class="[ mt-[3rem] ] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">

        {#each data.categories as category}
            <div class="w-full max-w-sm bg-white border border-gray-200">
                <a href="/products/{category.id}">
                    <img class="p-8 w-full aspect-square" src="{category.photo}" alt="{category.name}" title="{category.name}" />
                </a>
                <div class="p-3 [ border-t-1 border-t-gray-200 ]">
                    <a href="/products/{category.id}">
                        <h5 class=" text-sm text-center font-normal tracking-wide text-black uppercase">
                            <span>
                                {category.name}
                            </span>
                            <span class="text-blue-600">
                              ({category.count})
                            </span>
                        </h5>
                    </a>
                </div>
            </div>
        {/each}

    </div>
</div>