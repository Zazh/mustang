<script lang="ts">
    import { sidebarOpen } from "../stores/sidebarStore";
    import { Modal } from 'flowbite-svelte';

    function openSidebar() {
        sidebarOpen.set(true);
    }

    let openModal = false;

    import { debounce } from 'lodash-es';
    interface SearchProduct {
        id: number;
        name: string;
        sku: string;
        category_id: number;
        category_name: string;
        info: {
            description: string;
            photo: string | null;
            advantages: string[];
        };
        attributes: {
            attribute_name: string;
            value: string;
        }[];
    }
    let searchQuery = '';
    let searchResults: SearchProduct[] = [];
    let isLoading = false;
    let searchError = '';
    
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || '';

    const performSearch = debounce(async (query: string) => {
        // Очищаем результаты, если запрос короче 3 символов
        if (query.trim().length < 3) {
            searchResults = [];
            return;
        }

        try {
            isLoading = true;
            searchError = '';
            
            // Формируем URL с учетом baseUrl
            const url = new URL('/products/products/', baseUrl);
            url.searchParams.append('search', query);
            
            console.log('Searching URL:', url.toString()); // Для отладки

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('К сожалению, товар не найден. Попробуйте изменить поисковый запрос.');
                }
                const errorText = await response.text();
                throw new Error('Произошла ошибка при поиске. Пожалуйста, попробуйте позже.');
            }

            const data = await response.json();
            searchResults = Array.isArray(data) ? data : [];
            console.log('Search results:', searchResults); // Для отладки
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes('Failed to fetch')) {
                    searchError = 'Не удалось подключиться к серверу. Пожалуйста, проверьте подключение к интернету.';
                } else {
                    searchError = err.message;
                }
            } else {
                searchError = 'Произошла ошибка при поиске. Пожалуйста, попробуйте позже.';
            }
            console.error('Search error:', err);
            searchResults = [];
        } finally {
            isLoading = false;
        }
    }, 300);
</script>
<nav class="navbar navbar-expand-lg bg-light-300 w-full z-10 [ fixed top-0 ] [ px-5 ] [ border-b-1 border-b-gray-300 h-16 ] [ flex justify-between  items-center ]">
    <div class="navbar-burger [ h-16 ] [ flex items-center gap-5 ]">
        <button on:click={openSidebar} class="burger-icon-w [ flex items-center justify-center ]" aria-label="open sidebar">
            <svg class="burger-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 48 24">
                <path fill="#000" d="M0,0 L48,0 L48,4 L0,4 Z"/>
                <path fill="#000" d="M0,20 L48,20 L48,24 L0,24 Z"/>
            </svg>
        </button>
        <button on:click={openSidebar} class="text-black uppercase text-3xl font-display">Menu</button>
    </div>

    <form class="navbar-search hidden lg:flex [ h-full w-1/4 ] [ flex items-center ] [ border-s-1 border-b-gray-300 ]">
        <input on:click={() => openModal = true} class="tracking-widest uppercase border-0 outline-0 ps-8 w-full h-full bg-light-300 placeholder-black focus:placeholder-gray-600 text-sm" required placeholder="Поиск по названию"  >
        <button aria-label="search" class="hover:cursor-pointer">
            <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3314 12.8706C26.3314 14.4003 26.0584 15.8677 25.5575 17.2287L35.9996 23.1224L33.7099 26.9993L23.2788 21.1119C20.8638 23.9411 17.2298 25.7413 13.1657 25.7413C5.89448 25.7413 0 19.9789 0 12.8706C0 5.76238 5.89448 0 13.1657 0C20.4369 0 26.3314 5.76238 26.3314 12.8706ZM13.0421 21.7035C18.1004 21.7035 22.2009 17.6949 22.2009 12.75C22.2009 7.80513 18.1004 3.79652 13.0421 3.79652C7.98389 3.79652 3.88338 7.80513 3.88338 12.75C3.88338 17.6949 7.98389 21.7035 13.0421 21.7035Z" fill="black"/>
            </svg>
        </button>
    </form>

    <div class="navbar-search lg:hidden [ h-full ps-5 ] [ flex items-center justify-center ] [ border-s-1 border-b-gray-300 ]">
        <button on:click={() => openModal = true} aria-label="search" class="hover:cursor-pointer">
            <svg width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3314 12.8706C26.3314 14.4003 26.0584 15.8677 25.5575 17.2287L35.9996 23.1224L33.7099 26.9993L23.2788 21.1119C20.8638 23.9411 17.2298 25.7413 13.1657 25.7413C5.89448 25.7413 0 19.9789 0 12.8706C0 5.76238 5.89448 0 13.1657 0C20.4369 0 26.3314 5.76238 26.3314 12.8706ZM13.0421 21.7035C18.1004 21.7035 22.2009 17.6949 22.2009 12.75C22.2009 7.80513 18.1004 3.79652 13.0421 3.79652C7.98389 3.79652 3.88338 7.80513 3.88338 12.75C3.88338 17.6949 7.98389 21.7035 13.0421 21.7035Z" fill="black"/>
            </svg>
        </button>
    </div>

</nav>

<!-- Main modal -->
<Modal bind:open={openModal}>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        Поиск
    </h3>

    <div class="pb-0">
        <form class="flex items-center">
            <label for="search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text" id="search"
                       bind:value={searchQuery}
                       on:input={() => performSearch(searchQuery)}
                       class="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                       placeholder="Поиск по названию..."
                       required />
            </div>
            <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Search</span>
            </button>
        </form>
    </div>

    <div>
        <ul class="my-2 space-y-2">
            {#if isLoading}
                <li class="flex items-center justify-center p-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
                </li>
            {:else if searchError}
                <li class="p-4 text-red-600 text-center">
                    {searchError}
                </li>
            {:else if searchResults.length > 0}
                {#each searchResults as product}
                <li>
                    <a href="/products/product/{product.id}" class="[ border-1 border-gray-200 ] flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-white hover:bg-gray-100 group hover:shadow">
                        <span class="flex flex-col ms-2">
                            <span class="whitespace-nowrap text-md">{product.name}</span>
                            <span class="inline-flex items-center text-xs font-medium text-blue-600 rounded-sm tracking-wide">{product.category_name}</span>
                        </span>
                        <span>
                            <svg class="rtl:rotate-180 w-3 h-3 text-gray-300 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
                            </svg>
                        </span>
                    </a>
                </li>
                {/each}
            {:else if searchQuery.trim()}
                <li class="p-4 text-gray-500">
                    {#if searchQuery.trim().length < 3}
                        Введите минимум 3 символа для поиска
                    {:else}
                        Ничего не найдено
                    {/if}
                </li>
            {/if}
        </ul>
    </div>
</Modal>

<style>

</style>
