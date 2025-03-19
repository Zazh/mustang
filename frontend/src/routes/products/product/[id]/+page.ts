import type { PageLoad } from './$types';

// @ts-ignore
export const load: PageLoad = async ({ fetch, params }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || '';

    const { id } = params as { id: string }; // Приводим params к нужному типу
    const res = await fetch(`${baseUrl}/products/products/${id}/`);

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    const product = await res.json();
    return { product };
};
