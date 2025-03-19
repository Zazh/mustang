import type { PageLoad } from './$types';

// @ts-ignore
export const load: PageLoad = async ({ fetch, params }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || '';

    const { id } = params as { id: string }; // Приводим params к нужному типу
    const res = await fetch(`${baseUrl}/pointsales/`);

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    console.log('VITE_BACKEND_API_URL:', import.meta.env.VITE_BACKEND_API_URL);
    console.log('Fetch URL:', `${baseUrl}/pointsales/`);
    console.log('Ответ от сервера:', text);


    const pointsales = await res.json();
    return { pointsales };
};
