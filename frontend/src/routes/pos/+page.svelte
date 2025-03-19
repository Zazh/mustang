<script lang="ts">
    import { onMount } from 'svelte';
    import { Modal } from 'flowbite-svelte';
    import type { Store } from '../../types/store';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';

    let openPos = false;
    let selectedPoint: Store | null = null;

    let pointsales: Store[] = get(page).data.pointsales;

    // Выбранный город для фильтрации
    let selectedCity = '';

    // Уникальные пары город-страна
    type CityCountry = { city: string; country: string };
    let cityCountries: CityCountry[] = [];

    // При загрузке страницы формируем уникальные города и страны
    onMount(() => {
        const citySet = new Set<string>();
        const uniqueCities: CityCountry[] = [];

        pointsales.forEach((point) => {
            const key = `${point.city}|${point.country}`;
            if (!citySet.has(key)) {
                citySet.add(key);
                uniqueCities.push({ city: point.city, country: point.country });
            }
        });

        cityCountries = uniqueCities; // Переприсваиваем массив, чтобы Svelte увидел изменения
    });

    // Отфильтрованные точки продаж (реактивно)
    $: filteredPoints = (selectedCity
            ? pointsales.filter((point) => point.city === selectedCity)
            : pointsales
    ).slice().sort((a, b) => {
        if (a.is_points === b.is_points) {
            return a.id - b.id;
        }
        return a.is_points ? -1 : 1; // сначала is_points === true
    });


    function openPointDetails(point: Store) {
        selectedPoint = point;
        openPos = true;
    }

    function truncateText(text: string, maxLength: number): string {
        return text.length > maxLength ? text.slice(0, maxLength).trim() + '...' : text;
    }
</script>

<div class="container mx-auto max-w-[1292px] px-4">
    <div class="mt-[3.5rem] ">
        <h1 class="md:text-7xl [ uppercase text-center font-display ] [ text-5xl ]">
            Точки продаж
        </h1>
    </div>

    <div class="mt-[2rem] ">
        <div class="max-w-2xl mx-auto ">
            <div class="pb-4">
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Выберите город:</label>
                <select id="city-select"
                        class="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/1 p-2.5 "
                        bind:value={selectedCity}
                >
                    <option selected value="">Все города</option>

                    {#each cityCountries as item}
                        <option value={item.city}>{item.city} / {item.country}</option>
                    {/each}

                </select>
            </div>

            <ul>
                {#each filteredPoints as point}
                <li class="[ border-b-1 border-b-gray-400 ] [ relative z-0 ] py-5 sm:pb-4">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-1 min-w-0">
                            <p class="flex item-center gap-2 flex-wrap">
                                <span class="text-lg font-medium text-gray-900 truncate uppercase tracking-wide">
                                    {truncateText(point.name, 20)}
                                </span>
                                {#if point.is_points}
                                    <span class="[ px-3 py-1 ] rounded text-sm font-medium text-lime-600 bg-lime-100 tracking-wide">
                                        Фирменный салон
                                    </span>
                                {:else}
                                    <span class="[ px-3 py-1 ] rounded text-sm font-medium text-blue-700 bg-blue-100 tracking-wide">
                                        Партнер
                                    </span>
                                {/if}
                            </p>
                            <p class="[ flex items-center gap-3 pt-3 pb-3 ]">
                                <span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.1242 1.70833C13.0233 0.606667 11.5583 0 10 0C8.44167 0 6.9775 0.606667 5.875 1.70833C3.60083 3.9825 3.60083 7.68333 5.88167 9.96417L10 13.9917L14.1242 9.9575C15.2258 8.85583 15.8333 7.39083 15.8333 5.8325C15.8333 4.27417 15.2258 2.81083 14.1242 1.70833ZM10 8.325C8.61917 8.325 7.5 7.20583 7.5 5.825C7.5 4.44417 8.61917 3.325 10 3.325C11.3808 3.325 12.5 4.44417 12.5 5.825C12.5 7.20583 11.3808 8.325 10 8.325ZM0.639167 15.0008L5.93167 15.0092L5.30583 20H0L0.0125 18.6075L0.639167 15.0008ZM6.22917 12.6358L6.14083 13.3425L0.929167 13.3342L1.79917 8.3325H2.92917C3.29833 9.38 3.9025 10.3417 4.71667 11.1558L6.22917 12.6358ZM20 18.7492V19.9992H14.6942L14.07 15.0217L19.3575 15.03L20 18.7492ZM12.39 15.0192L13.015 19.9992H6.98583L7.61167 15.0117L8.66083 15.0133L10.0008 16.3233L11.3358 15.0175L12.39 15.0192ZM19.07 13.3633L13.8608 13.355L13.7708 12.635L15.3033 11.1358C16.1083 10.3308 16.7075 9.375 17.075 8.3325H18.2008L19.07 13.3633Z" fill="#0052BA"/>
                                    </svg>
                                </span>
                                <span class="[ hidden md:block ] text-base text-gray-300 leading-tight h-4">
                                    {point.city}, {truncateText(point.address, 50)}
                                </span>
                                <span class="[ md:hidden ] text-base text-gray-300 leading-tight h-4">
                                    {point.city}, {truncateText(point.address, 25)}
                                </span>
                            </p>
                            <button on:click={() => openPointDetails(point)}  class="absolute inset-0 cursor-pointer" aria-label="Точка продаж"></button>
                        </div>
                        <div>
                            <svg class="rtl:rotate-180 w-3 h-3 text-gray-300 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"></path>
                            </svg>
                        </div>
                    </div>
                </li>
                {/each}

            </ul>
        </div>
    </div>
</div>

<Modal bind:open={openPos} dismissable>
    {#if selectedPoint}
    <h2 class="flex flex-wrap item-center gap-3">
        <span class="text-xl font-bold text-gray-900 truncate uppercase tracking-wide">
            {selectedPoint.name}
        </span>
        {#if selectedPoint.is_points}
            <span class="[ px-3 py-1 ] rounded text-sm font-medium text-lime-600 bg-lime-100 tracking-wide">
                Фирменный салон
            </span>
        {:else}
            <span class="[ px-3 py-1 ] rounded text-sm font-medium text-blue-700 bg-blue-100 tracking-wide">
                Партнеры
            </span>
        {/if}
    </h2>
    <div>
        <ol>
            <li class="flex flex-col gap-1 pt-3 pb-2">
                <h5 class="text-black text-sm uppercase tracking-wider font-medium">Адрес</h5>
                <ul>
                    <li class="text-sm text-gray-300 [ flex ]">
                        <span class="w-[2rem] md:w-[1.5rem]">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="var(--color-blue-700)" d="M14.1242 1.70833C13.0233 0.606667 11.5583 0 10 0C8.44167 0 6.9775 0.606667 5.875 1.70833C3.60083 3.9825 3.60083 7.68333 5.88167 9.96417L10 13.9917L14.1242 9.9575C15.2258 8.85583 15.8333 7.39083 15.8333 5.8325C15.8333 4.27417 15.2258 2.81083 14.1242 1.70833ZM10 8.325C8.61917 8.325 7.5 7.20583 7.5 5.825C7.5 4.44417 8.61917 3.325 10 3.325C11.3808 3.325 12.5 4.44417 12.5 5.825C12.5 7.20583 11.3808 8.325 10 8.325ZM0.639167 15.0008L5.93167 15.0092L5.30583 20H0L0.0125 18.6075L0.639167 15.0008ZM6.22917 12.6358L6.14083 13.3425L0.929167 13.3342L1.79917 8.3325H2.92917C3.29833 9.38 3.9025 10.3417 4.71667 11.1558L6.22917 12.6358ZM20 18.7492V19.9992H14.6942L14.07 15.0217L19.3575 15.03L20 18.7492ZM12.39 15.0192L13.015 19.9992H6.98583L7.61167 15.0117L8.66083 15.0133L10.0008 16.3233L11.3358 15.0175L12.39 15.0192ZM19.07 13.3633L13.8608 13.355L13.7708 12.635L15.3033 11.1358C16.1083 10.3308 16.7075 9.375 17.075 8.3325H18.2008L19.07 13.3633Z"/>
                            </svg>
                        </span>
                        <span class="tracking-wide">{selectedPoint.address}</span>
                    </li>
                </ul>
            </li>

            {#if selectedPoint.info}
                {#if selectedPoint.info.phones}
                <li class="flex flex-col gap-1 pt-3 pb-2">
                    <h5 class="text-black text-sm uppercase tracking-wider font-medium">Телефон</h5>
                    <ul class="flex flex-wrap">
                        {#each selectedPoint.info.phones as phone}
                            {#if phone.trim()}
                            <li class="text-sm text-blue-700 [ flex pe-5 pb-1 ]">
                                <span class="w-[1.5rem] md:w-[1.5rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                        <path fill="var(--color-blue-700)" d="M0,12c0,6.617,5.383,12,12,12s12-5.383,12-12C24,5.383,18.617,0,12,0S0,5.383,0,12Zm5-3.11c0-.826,.298-1.654,.928-2.283l1.607-1.607,3.164,3.164-2.071,2.071c1.029,2.561,2.772,4.234,5.137,5.137l2.071-2.071,3.164,3.164-1.607,1.607c-.629,.63-1.457,.928-2.283,.928-4.24,0-10.11-5.544-10.11-10.11Z"/>
                                    </svg>
                                </span>
                                <a href="tel:{phone.trim()}" class="font-medium">{phone.trim()}</a>
                            </li>
                            {/if}
                        {/each}
                    </ul>
                </li>
                {/if}

                {#if selectedPoint.info.email}
                <li class="flex flex-col gap-1 pt-3 pb-2">
                    <h5 class="text-black text-sm uppercase tracking-wider font-medium">E-mail</h5>
                    <ul>
                        <li class="text-sm text-blue-600 pb-1 [ flex gap-2 ]">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="var(--color-blue-700)"  d="M1.225,8.467C1.331,8.344,8.48,1.449,8.48,1.449a5.026,5.026,0,0,1,7.055.015s7.134,6.88,7.239,7l-8.653,8.654a3.074,3.074,0,0,1-4.242,0Zm14.31,10.069a5.024,5.024,0,0,1-7.07,0L.229,10.3A4.962,4.962,0,0,0,0,11.708V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V11.708a4.962,4.962,0,0,0-.229-1.408Z"/>
                                </svg>
                            </span>
                            <a href="mailto:{selectedPoint.info.email}" class="font-medium" aria-label="E-mail">{selectedPoint.info.email}</a>
                        </li>
                    </ul>
                </li>
                {/if}

                {#if selectedPoint.info.socialAcc}
                <li class="flex flex-col gap-1 pt-3 pb-2">
                    <h5 class="text-black text-sm uppercase tracking-wider font-medium">Instagram</h5>
                    <ul>
                        <li class="text-sm text-blue-600 pb-1 flex pe-5 ">
                            <span class="w-[1.5rem]">
                                <svg
                                    xml:space="preserve"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <defs id="defs49"><clipPath
                                        clipPathUnits="userSpaceOnUse"
                                        id="clipPath59"><path
                                            d="M 0,24 H 24 V 0 H 0 Z"
                                            id="path57" /></clipPath></defs><g
                                        id="g51"
                                        transform="matrix(1.3333333,0,0,-1.3333333,0,32)"><g
                                        id="g53"><g
                                            id="g55"
                                            clip-path="url(#clipPath59)"><g
                                            id="g61"
                                            transform="translate(16.5,12)"><path
                                                d="M 0,0 C 0,-2.485 -2.015,-4.5 -4.5,-4.5 -6.985,-4.5 -9,-2.485 -9,0 -9,2.485 -6.985,4.5 -4.5,4.5 -2.015,4.5 0,2.485 0,0 Z"
                                                style="fill:none;stroke:var(--color-blue-700);stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
                                                id="path63" /></g><g
                                            id="g65"
                                            transform="translate(18.2046,3.5283)"><path
                                                d="m 0,0 c -1.738,-1.275 -3.883,-2.028 -6.205,-2.028 -5.798,0 -10.5,4.701 -10.5,10.5 0,5.799 4.702,10.5 10.5,10.5 5.799,0 10.5,-4.701 10.5,-10.5 v -1.5 c 0,-1.657 -1.343,-3 -3,-3 -1.656,0 -3,1.343 -3,3 v 1.5"
                                                style="fill:none;stroke:var(--color-blue-700);stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
                                                id="path67" /></g></g></g></g></svg>
                            </span>
                            <a href="https://instagram.com/{selectedPoint.info.socialAcc}" target="_blank" rel="noopener noreferrer" class="font-medium">{selectedPoint.info.socialAcc}</a>
                        </li>
                    </ul>
                </li>
                {/if}

                {#if selectedPoint.info.working_hours}
                <li class="flex flex-col gap-1 pt-3 pb-2">
                    <h5 class="text-black text-sm tracking-wider uppercase font-medium">График работы</h5>
                    <ul class="flex flex-wrap gap-1">
                        {#each selectedPoint.info.working_hours.split('\n') as hours}
                            {#if hours.trim()}
                            <li class="text-sm font-medium flex text-gray-300 bg-gray-50 px-3 py-2 border-1 rounded-full border-gray-500">
                                <span class="w-[1.5rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                        <path fill="var(--color-gray-300)" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm1,11.879a1,1,0,0,1-.469.848l-3.84,2.4a1,1,0,1,1-1.062-1.7L11,11.325V7a1,1,0,0,1,2,0Z"/>
                                    </svg>
                                </span>
                                <span>{hours.trim()}</span>
                            </li>
                            {/if}
                        {/each}
                    </ul>
                </li>
                {/if}
            {/if}
        </ol>
    </div>
    {/if}
</Modal>

<style>

</style>