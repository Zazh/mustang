import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, params }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || '';

    let res: Response;
    try {
        res = await fetch(`${baseUrl}/products/products/${params.id}/`);
    } catch (e) {
        console.error('Loader error:', e);
        throw error(500, 'Ошибка загрузки данных');
    }

    if (res.status === 404) {
        throw error(404, 'Товар не найден');
    }
    if (!res.ok) {
        throw error(500, 'Ошибка загрузки данных');
    }

    const product = await res.json();
    return { product };
};
