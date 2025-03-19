import type { PageLoad } from './$types';

// @ts-ignore
export const load: PageLoad = async ({ fetch }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || '';
    const res = await fetch(`${baseUrl}/api/products/categories/`);
    if (!res.ok) {
        throw new Error('Не удалось загрузить список категорий');
    }
    const categories = await res.json();
    return { categories };
};